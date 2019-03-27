namespace MSupps.API.Models
{
  public class OrderedProduct
  {
    public int Id { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; }
    public string PhotoUrl { get; set; }
    public int Quantity { get; set; }
    public double Price { get; set; }
    public string Name { get; set; }
    public string Brand { get; set; }
  }
}