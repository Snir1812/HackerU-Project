namespace API.Models.DTO
{
	public class Review
	{
		public int ID { get; set; }
		public int ProductID { get; set; }
		public Product? Product { get; set; }
		public int UserID { get; set; }
		public User? User { get; set; }
		public int Rating { get; set; }
		public string ReviewText { get; set; }
		public DateTime ReviewDate { get; set; }
	}
}
