using System;
using MSupps.API.Models;

namespace MSupps.API.Dtos
{
  public class UserDetailsDto
  {
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Address { get; set; }

    public DateTime DateOfBirth { get; set; }

    public Cart Cart { get; set; }
  }
}