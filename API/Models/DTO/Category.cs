using System.ComponentModel.DataAnnotations;

namespace API.Models.DTO
{
	public class Category
	{
		public int ID { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Description { get; set; }
		public ICollection<Product>? Products { get; set; }
	}
}