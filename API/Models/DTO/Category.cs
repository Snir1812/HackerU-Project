namespace API.Models.DTO
{
	public class Category
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		
		// Navigation property for Products
		public ICollection<Product>? Products { get; set; }
	}
}