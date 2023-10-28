using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models.DTO
{
	public class Product
	{
		public int ID { get; set; }
		[Required]
		public string ProductName { get; set; }
		[Required]
		public string Description { get; set; }
		[Required]
		public decimal Price { get; set; }
		[Required]
		public int StockQuantity { get; set; }
		[Required]
		public int CategoryID { get; set; }
		[JsonIgnore]
		public Category? Category { get; set; }
		public string? ImageUrl { get; set; }
		public ICollection<Review>? Reviews { get; set; }
		[NotMapped]
		[JsonIgnore]
		public IFormFile? ImageFile { get; set; }
	}
}
