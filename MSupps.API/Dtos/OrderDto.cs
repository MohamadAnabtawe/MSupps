using System;

namespace MSupps.API.Dtos
{
    public class OrderDto
    {
    public DateTime OrderDate { get; set; }
    public double TotalPrice { get; set; }
    public int UserId { get; set; }
    }
}