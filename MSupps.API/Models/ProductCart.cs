namespace MSupps.API.Models
{
  public class ProductCart
  {
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int CartId { get; set; }
    public Product Product { get; set; }
    public Cart Cart { get; set; }
    public int Quantity { get; set; }
  }

}