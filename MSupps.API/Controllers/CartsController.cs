
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MSupps.API.Data;
using MSupps.API.Dtos;
using MSupps.API.Models;

namespace MSupps.API.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class CartsController : ControllerBase
  {

    private readonly IMSuppsRepository _repo;
    private readonly IMapper _mapper;

    public CartsController(IMSuppsRepository repo, IMapper mapper)
    {
      _mapper = mapper;
      _repo = repo;
    }
    [HttpGet("{UserId}")]
    public async Task<IActionResult> GetCart(int UserId)
    {
      var cart = await _repo.GetCart(UserId);
      var usersToReturn = _mapper.Map<IEnumerable<CartProductDto>>(cart);
      return Ok(usersToReturn);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddProductToCart(CartProductDto cartProductDto)
    {
      var cartId=await _repo.GetCartId(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));
      var cartProductToCreate = new ProductCart
      {
        CartId = cartId,
        ProductId = cartProductDto.Product.Id,
        Quantity = 1
      };
      var CreatedcartProduct = await _repo.AddToCart(cartProductToCreate);
      return StatusCode(201);
    }

    [HttpGet("myCart/{UserId}")]
    public async Task<IActionResult> GetCartId(int UserId)
    {
      var cartId = await _repo.GetCartId(UserId);
      return Ok(cartId);
    }

    [HttpPut("{cartId}")]
     public async Task<IActionResult> UpdateCartProduct(int cartId,CartProductUpdateDto productToUpdate)
    {
      var productCart = await _repo.GetCartProduct(cartId,productToUpdate.ProductId);
      _mapper.Map(productToUpdate,productCart);
       if(await _repo.SaveAll())
        return NoContent();
      throw new Exception($"Updating cart failed on save");
    }

     [HttpDelete("{productId}")]
     public async Task<IActionResult> DeleteCartProduct(int productId)
    {
      var cartId=await _repo.GetCartId(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));
      var productCart = await _repo.GetCartProduct(cartId,productId);
      _repo.Delete(productCart);
      if(await _repo.SaveAll()) 
          return Ok();
      return BadRequest("Failed deleting the product");
    } 
  }
}