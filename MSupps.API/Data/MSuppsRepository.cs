using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MSupps.API.Models;

namespace MSupps.API.Data
{
  public class MSuppsRepository : IMSuppsRepository
  {
    private readonly DataContext _context;

    public MSuppsRepository(DataContext context)
    {
      _context = context;
    }
    /* -------------------------------------------------Generic-------------------------------------------- */
    public void Add<T>(T entity) where T : class
    {
      _context.Add(entity);
    }

    public void Delete<T>(T entity) where T : class
    {
      _context.Remove(entity);
    }
    /* -------------------------------------------------Products-------------------------------------------- */
    public async Task<Product> GetProduct(int id)
    {
      var product = await _context.Products.Include(ph => ph.Photos).FirstOrDefaultAsync(p => p.Id == id);
      return product;
    }

    public async Task<IEnumerable<Product>> GetProducts()
    {
      var products = await _context.Products
      .Include(ph => ph.Photos)
      .ToListAsync();
      return products;
    }
    public async Task<IEnumerable<Product>> GetProductsByCategory(string category)
    {
      var products = await _context.Products
      .Include(ph => ph.Photos)
      .Where(c => c.Category.Contains(category.ToLower()))
      .ToListAsync();
      return products;
    }

    public async Task<IEnumerable<Product>> SearchProduct(string searchString)
    {
      string str = searchString.ToLower();
      var products = await _context.Products
            .Include(ph => ph.Photos)
            .Where(c => c.Name.Contains(str) ||
            c.Category.Contains(str) ||
            c.Brand.Contains(str) ||
            c.OtherIngredients.Contains(str))
            .ToListAsync();
      return products;
    }

    public async Task<Product> AddProduct(Product product)
    {
      await _context.Products.AddAsync(product);
      await _context.SaveChangesAsync();
      return product;
    }
    public async Task<Photo> AddProductPhoto(Photo photo)
    {
      await _context.Photos.AddAsync(photo);
      await _context.SaveChangesAsync();
      return photo;
    }
    /* -------------------------------------------------Users-------------------------------------------- */
    public async Task<User> GetUser(int id)
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
      return user;
    }

    public async Task<IEnumerable<User>> GetUsers()
    {
      var user = await _context.Users.ToListAsync();
      return user;
    }
    /* -------------------------------------------------Orders-------------------------------------------- */
    public async Task<IEnumerable<OrderedProduct>> GetOrder(int OrderId)
    {
      var orderedProducts = await _context.OrderedProducts.Where(p => p.OrderId == OrderId).ToListAsync();
      return orderedProducts;
    }

    public async Task<IEnumerable<Order>> GetOrders(int UserId)
    {
      var orders = await _context.Orders.Where(p => p.UserId == UserId).ToListAsync();
      return orders;
    }

     public async Task<IEnumerable<Order>> GetAllOrders()
    {
      var orders = await _context.Orders.ToListAsync();
      return orders;
    }
     public async Task<Order> AddOrder(Order order)
    {
      await _context.Orders.AddAsync(order);
      await _context.SaveChangesAsync();
      return order;
    }
    /* -------------------------------------------------Cart-------------------------------------------- */
    public async Task<IEnumerable<object>> GetCart(int UserId)
    {
      var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == UserId);
      if (cart != null)
      {
        var productsCart = await _context.ProductCart
        .Include(p => p.Product.Photos)
        .Where(pc => pc.CartId == cart.Id).ToListAsync();
        return productsCart;
      }
      return null;
    }

     public async Task<int> GetCartId(int UserId)
    {
      var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == UserId);
      return cart.Id;
    }
    public async Task<ProductCart> AddToCart(ProductCart product)
    {
      var productsCart = await _context.ProductCart
        .FirstOrDefaultAsync(pc => pc.CartId == product.CartId && pc.Id == product.Id);
      if (productsCart == null)
      {
        await _context.ProductCart.AddAsync(product);
        await _context.SaveChangesAsync();
      }
      return product;
    }
   public async Task<ProductCart> GetCartProduct(int cartId,int productId)
    {
      var productCart = await _context.ProductCart
        .Include(p => p.Product.Photos)
        .Where(pc => pc.CartId == cartId && pc.ProductId==productId).FirstAsync();
      return productCart;
    }

    public async Task<bool> SaveAll()
    {
      return await _context.SaveChangesAsync() > 0;
    }
  }
}