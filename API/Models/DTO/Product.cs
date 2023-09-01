using Microsoft.AspNetCore.Mvc.ViewEngines;

namespace API.Models.DTO
{
	public class Product
	{
		public int ID { get; set; }
		public string ProductName { get; set; }
		public string Description { get; set; }
		public decimal Price { get; set; }
		public int StockQuantity { get; set; }
		public int CategoryID { get; set; }
		public Category? Category { get; set; }
		public string ImageUrl { get; set; }

		// Navigation property for Reviews/Ratings
		public ICollection<Review>? Reviews { get; set; }
	}
}
