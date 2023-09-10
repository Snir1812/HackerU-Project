using API.Models.DTO;
using API.Repositories;

namespace API.Models
{
	internal class InitialStateData
	{
		private InitialStateData()
		{
		}

		//public List<Review> Reviews { get; private set; }
		//public List<User> Users { get; private set; }		
		//public List<OrderItem> OrderItems { get; private set; }
		public List<Product> Products { get; private set; }
		public List<Order> Orders { get; private set; }
		public List<Category> Categories { get; private set; }

		internal static InitialStateData Create(
			ICategoryRepository _categoryRepo,
			IOrderRepository _orderRepo,
			IProductRepository _productRepo
			//IOrderItemRepository _orderItemRepo,
			//IUserRepository _userRepo,
			//IReviewRepository _reviewRepo
			)
		{
			InitialStateData initialStateData = new InitialStateData();

			//initialStateData.Reviews = _reviewRepo.FindAll().ToList();
			//initialStateData.Users = _userRepo.FindAll().ToList();
			//initialStateData.OrderItems = _orderItemRepo.FindAll().ToList();
			initialStateData.Products = _productRepo.FindAll().ToList();
			initialStateData.Orders = _orderRepo.FindAll().ToList();
			initialStateData.Categories = _categoryRepo.FindAll().ToList();

			return initialStateData;
		}
	}
}