using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models.DTO
{
	public class OrderItem
	{
		public int ID { get; set; }
		[Required]
		public int OrderID { get; set; }
		[JsonIgnore]
		public Order? Order { get; set; }
		[Required]
		public int ProductID { get; set; }
		[JsonIgnore]
		public Product? Product { get; set; }
		[Required]
		public int Quantity { get; set; }
		[Required]
		public decimal PricePerItem { get; set; }
	}
}