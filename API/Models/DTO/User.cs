using Microsoft.AspNetCore.Mvc.ViewEngines;
using API.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace API.Models.DTO
{
	public class User
	{
		public int ID { get; set; }
		[Required]
		public string FirstName { get; set; }
		[Required]
		public string LastName { get; set; }
		[Required]
		[EmailAddress(ErrorMessage = "Invalid email address")]
		public string Email { get; set; }
		[Required]
		public string UserName { get; set; }
		[Required(ErrorMessage = "Password is required")]
		[RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$",
	    ErrorMessage = "Password must be at least 8 characters long and contain at least one letter and one number.")]
		public string Password { get; set; }
		[Required]
		public string Address { get; set; }
		[Required(ErrorMessage = "Phone number is required")]
		[RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be 10 digits")]
		public string PhoneNumber { get; set; }
		public UserType Type { get; set; } = 0;
		public ICollection<Order>? Orders { get; set; }
		public ICollection<Review>? Reviews { get; set; }
	}
}
