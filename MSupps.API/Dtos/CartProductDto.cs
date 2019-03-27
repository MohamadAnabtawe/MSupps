using MSupps.API.Models;

namespace MSupps.API.Dtos
{
  public class CartProductDto
  {
    public int Id { get; set; }
    public ProductToReturnDto Product { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public int CartId { get; set; }
  }
}