using API.Models;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class InitialStateController : Controller
	{
		private readonly IReviewRepository _reviewRepo;
		//private readonly IUserRepository _userRepo;
		private readonly IOrderItemRepository _orderItemRepo;
		private readonly IConfiguration _config;
		private readonly IProductRepository _productRepo;
		private readonly IOrderRepository _orderRepo;
		private readonly ICategoryRepository _categoryRepo;

		public InitialStateController(
			IConfiguration _config,
			ICategoryRepository _categoryRepo,
			IOrderRepository _orderRepo,
			IProductRepository _productRepo,
			IOrderItemRepository _orderItemRepo,
			//IUserRepository _userRepo,
			IReviewRepository _reviewRepo
			)
		{
			this._config = _config ?? throw new ArgumentNullException(nameof(_config));
			this._reviewRepo = _reviewRepo ?? throw new ArgumentNullException(nameof(_reviewRepo));
			//this._userRepo = _userRepo ?? throw new ArgumentNullException(nameof(_userRepo));
			this._orderItemRepo = _orderItemRepo ?? throw new ArgumentNullException(nameof(_orderItemRepo));
			this._productRepo = _productRepo ?? throw new ArgumentNullException(nameof(_productRepo));
			this._orderRepo = _orderRepo ?? throw new ArgumentNullException(nameof(_orderRepo));
			this._categoryRepo = _categoryRepo ?? throw new ArgumentNullException(nameof(_categoryRepo));
		}

		[HttpGet]
		public IActionResult GetAll()
		{
			InitialStateData result = InitialStateData.Create(
				_categoryRepo,
				_orderRepo,
				_productRepo,
				_orderItemRepo,
				//_userRepo,
				_reviewRepo
				);

			return Ok(result);
		}
	}
}
