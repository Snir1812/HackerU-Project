using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models.DTO
{
	public class Review
	{
		public int ID { get; set; }
		[Required]
		public int ProductID { get; set; }
		[JsonIgnore]
		public Product? Product { get; set; }
		[Required]
		public int UserID { get; set; }
		[JsonIgnore]
		public User? User { get; set; }
		[Required]
		[Range(1, 10, ErrorMessage = "Rating must be between 1 and 10")]
		public int Rating { get; set; }
		[Required]
		public string ReviewText { get; set; }
		public DateTime ReviewDate { get; set; }
	}
}
