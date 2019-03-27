using System;

namespace MSupps.API.Models
{
  public class User
  {
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Address { get; set; }
    public byte[] PasswordHash { get; set; }

    public byte[] PasswordSalt { get; set; }

    public int Role { get; set; }
    public DateTime DateOfBirth { get; set; }

    public Cart Cart { get; set; }
  }
}