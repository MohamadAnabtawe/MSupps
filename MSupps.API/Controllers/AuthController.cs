using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MSupps.API.Data;
using MSupps.API.Dtos;
using MSupps.API.Models;

namespace MSupps.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IAuthRepository _repo;
    private readonly IConfiguration _config;
    public AuthController(IAuthRepository repo, IConfiguration config)
    {
      _config = config;
      _repo = repo;
    }
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
    {
      // validate request
      userForRegisterDto.Email = userForRegisterDto.Email.ToLower();
      if (await _repo.UserExists(userForRegisterDto.Email))
        return BadRequest("Email already used!");
      var userToCreate = new User
      {
        Email = userForRegisterDto.Email,
        FirstName = userForRegisterDto.FirstName,
        LastName = userForRegisterDto.LastName,
        DateOfBirth = userForRegisterDto.Birthday,
        Address = userForRegisterDto.Address
      };
      var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);
      var cart = new Cart
      {
        User = createdUser,
        UserId = createdUser.Id,
        TotalPrice = 0
      };
      var createdCart=await _repo.CreatUserCart(cart);

      return StatusCode(201);
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
    {
      var userFromRepo = await _repo.Login(userForLoginDto.Email.ToLower(), userForLoginDto.Password);
      if (userFromRepo == null)
        return Unauthorized();
      // bulding a token to return to the user
      var claims = new[]{
            new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
            new Claim(ClaimTypes.Email,userFromRepo.Email),
            new Claim(ClaimTypes.Surname,userFromRepo.LastName),
            new Claim(ClaimTypes.GivenName,userFromRepo.FirstName),
             new Claim(ClaimTypes.Role,userFromRepo.Role.ToString())
        };
      //key to sign our token
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.Now.AddDays(1),
        SigningCredentials = creds
      };
      var tokenHandler = new JwtSecurityTokenHandler();

      //contains the JWT token that we want to return to our client
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return Ok(new
      {
        token = tokenHandler.WriteToken(token)
      });
    }
  }
}