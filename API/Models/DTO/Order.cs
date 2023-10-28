using API.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models.DTO
{
	public class Order
	{
		public int ID { get; set; }
		[Required]
		public int UserID { get; set; }
		[JsonIgnore]
		public User? User { get; set; }
		public DateTime OrderDate { get; set; }
		public OrderStatus OrderStatus { get; set; } = OrderStatus.Ordered;
		public decimal TotalPrice { get; set; }
		public ICollection<OrderItem>? OrderItems { get; set; }
	}
}
