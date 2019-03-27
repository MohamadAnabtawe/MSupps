using System;

namespace MSupps.API.Dtos
{
  public class OrdersToReturnDto
  {
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public double TotalPrice { get; set; }
  }
}