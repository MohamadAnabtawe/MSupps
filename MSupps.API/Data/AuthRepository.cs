using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MSupps.API.Models;

namespace MSupps.API.Data
{
  public class AuthRepository : IAuthRepository
  {
    private readonly DataContext _context;

    public AuthRepository(DataContext context)
    {
      _context = context;
    }
    public async Task<User> Login(string email, string password)
    {
      var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
      if (user == null)
        return null;
      if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt)) return null;

      return user;

    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
      {
        //create a hash with the salt key of the user
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        //if the password hashes match then the password is correct
        for (int i = 0; i < computedHash.Length; i++)
          if (computedHash[i] != passwordHash[i]) return false;
      }
      return true;
    }

    public async Task<User> Register(User user, string password)
    {
      byte[] passwordHash, passwordSalt;
      //out -> we pass the parameters as referance so after the method is called they will be updated when we return.
      CreatePasswordHash(password, out passwordHash, out passwordSalt);

      user.PasswordHash = passwordHash;
      user.PasswordSalt = passwordSalt;

      await _context.Users.AddAsync(user);
      await _context.SaveChangesAsync();

      return user;
    }

    //generates the password hash
    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      //after the code inside the block finshed everything inside will be disposed (the dispose method will be called) 
      using (var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        //SHA512 provides a randomly generated key, we use that as the salt.
        passwordSalt = hmac.Key;
        //the computed hash method takes a byte array, so we need to encode our password into a byte array.
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }

    }

    //if user exist in the database return true else false
    public async Task<bool> UserExists(string email)
    {
      if (await _context.Users.AnyAsync(x => x.Email == email)) return true;
      return false;
    }

    //creats a new cart for a new user
    public async Task<Cart> CreatUserCart(Cart cart)
    {

      await _context.Carts.AddAsync(cart);
      await _context.SaveChangesAsync();
      return cart;
    }
  }
}