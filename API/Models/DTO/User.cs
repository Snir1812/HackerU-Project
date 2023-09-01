using Microsoft.AspNetCore.Mvc.ViewEngines;
using API.Models.Enums;

namespace API.Models.DTO
{
	public class User
	{
		public int ID { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; } // Hashed and salted password
		public string Address { get; set; }
		public string PhoneNumber { get; set; }
		public UserType Type { get; set; } = 0;

		// Navigation property for Orders
		public ICollection<Order>? Orders { get; set; }
		// Navigation property for Reviews/Ratings
		public ICollection<Review>? Reviews { get; set; }
	}
}
