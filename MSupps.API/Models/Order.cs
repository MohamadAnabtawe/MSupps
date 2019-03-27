using System;
using System.Collections.Generic;

namespace MSupps.API.Models
{
  public class Order
  {
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public double TotalPrice { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
  }
}