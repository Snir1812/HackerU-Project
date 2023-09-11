using System.Text.Json.Serialization;

namespace API.Models.DTO
{
	public class OrderItem
	{
		public int ID { get; set; }
		public int OrderID { get; set; }
		[JsonIgnore]
		public Order? Order { get; set; }
		public int ProductID { get; set; }
		[JsonIgnore]
		public Product? Product { get; set; }
		public int Quantity { get; set; }
		public decimal PricePerItem { get; set; }
	}
}