using Microsoft.EntityFrameworkCore;
using MSupps.API.Models;

namespace MSupps.API.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }

    public DbSet<Photo> Photos { get; set; }

    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<ProductCart> ProductCart { get; set; }
    public DbSet<OrderedProduct> OrderedProducts { get; set; }
  }
}