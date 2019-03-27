using System.Collections.Generic;

namespace MSupps.API.Models
{
  public class Cart
  {
    public int Id { get; set; }
    public User User { get; set; }
    public int UserId { get; set; }
    public double TotalPrice { get; set; }
  }
}