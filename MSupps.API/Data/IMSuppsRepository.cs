using System.Collections.Generic;
using System.Threading.Tasks;
using MSupps.API.Models;

namespace MSupps.API.Data
{
  public interface IMSuppsRepository
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<bool> SaveAll();
    Task<IEnumerable<User>> GetUsers();
    Task<User> GetUser(int id);
    Task<IEnumerable<Product>> GetProducts();
    Task<Photo> AddProductPhoto(Photo photo);
    Task<ProductCart> AddToCart(ProductCart product);
    Task<IEnumerable<Product>> GetProductsByCategory(string category);
    Task<IEnumerable<Product>> SearchProduct(string searchString);
    Task<Product> GetProduct(int id);
    Task<Product> AddProduct(Product product);
    Task<Order> AddOrder(Order order);
    Task<IEnumerable<Order>> GetOrders(int UserId);
    Task<IEnumerable<Order>> GetAllOrders();
    Task<IEnumerable<OrderedProduct>> GetOrder(int OrderId);
    Task<IEnumerable<object>> GetCart(int UserId);
    Task<int> GetCartId(int UserId);
    Task<ProductCart> GetCartProduct(int cartId,int productId);

  }
}