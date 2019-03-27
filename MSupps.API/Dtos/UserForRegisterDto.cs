using System;
using System.ComponentModel.DataAnnotations;

namespace MSupps.API.Dtos
{
  public class UserForRegisterDto
  {
    [Required]
    public string Email { get; set; }
    [Required]
    [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8")]
    public string Password { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Address { get; set; }
    [Required]
    public DateTime Birthday { get; set; }


  }
}