using System.Threading.Tasks;
using MSupps.API.Models;

namespace MSupps.API.Data
{
  public interface IAuthRepository
  {
    Task<User> Register(User user, string password);

    Task<User> Login(string email, string password);
    Task<Cart> CreatUserCart(Cart cart);

    Task<bool> UserExists(string email);
  }
}