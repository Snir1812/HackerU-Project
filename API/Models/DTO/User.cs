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
		public string Email { get; set; }
		[Required]
		public string UserName { get; set; }
		[Required]
		public string Password { get; set; } // Hashed and salted password
		[Required]
		public string Address { get; set; }
		[Required]
		public string PhoneNumber { get; set; }
		public UserType Type { get; set; } = 0;
		public ICollection<Order>? Orders { get; set; }
		public ICollection<Review>? Reviews { get; set; }
	}
}
