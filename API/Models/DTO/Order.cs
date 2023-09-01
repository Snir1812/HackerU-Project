using API.Models.Enums;

namespace API.Models.DTO
{
	public class Order
	{
		public int ID { get; set; }
		public int UserID { get; set; }
		public DateTime OrderDate { get; set; } = DateTime.UtcNow;
		public OrderStatus OrderStatus { get; set; }
		public decimal TotalPrice { get; set; }

		// Navigation property for Order Items
		public ICollection<OrderItem>? OrderItems { get; set; }
	}
}
