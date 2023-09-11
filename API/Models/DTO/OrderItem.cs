namespace API.Models.DTO
{
	public class OrderItem
	{
		public int ID { get; set; }
		public int OrderID { get; set; }
		public Order? Order { get; set; }
		public int ProductID { get; set; }
		public Product? Product { get; set; }
		public int Quantity { get; set; }
		public decimal PricePerItem { get; set; }
	}
}