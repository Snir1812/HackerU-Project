using API.Models.Enums;
using System.Text.Json.Serialization;

namespace API.Models.DTO
{
	public class Order
	{
		public int ID { get; set; }
		public int UserID { get; set; }
		[JsonIgnore]
		public User? User { get; set; }
		public DateTime OrderDate { get; set; }
		public OrderStatus OrderStatus { get; set; } = OrderStatus.Ordered;
		public decimal TotalPrice { get; set; }

		// Navigation property for Order Items
		public ICollection<OrderItem>? OrderItems { get; set; }
	}
}
