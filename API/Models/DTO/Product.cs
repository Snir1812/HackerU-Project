using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
		[JsonIgnore]
		public Category? Category { get; set; }
		public string? ImageUrl { get; set; }

		// Navigation property for Reviews/Ratings
		public ICollection<Review>? Reviews { get; set; }
		[NotMapped] // This attribute indicates that this property is not mapped to the database.
		[JsonIgnore] // Ignore this property during JSON serialization.
		public IFormFile? ImageFile { get; set; }
	}
}
