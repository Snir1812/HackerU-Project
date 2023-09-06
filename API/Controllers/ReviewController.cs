using API.Models.DTO;
using API.Models.Enums;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ReviewController : Controller
	{
		private readonly IConfiguration _config;
		private readonly IReviewRepository _reviewRepo;
		private readonly IUserRepository _userRepo;
		private readonly IProductRepository _productRepo;

		public ReviewController(IProductRepository _productRepo, IUserRepository _userRepo, IConfiguration _config, IReviewRepository _reviewRepo)
		{
			this._config = _config ?? throw new ArgumentNullException(nameof(_config));
			this._reviewRepo = _reviewRepo ?? throw new ArgumentNullException(nameof(_reviewRepo));
			this._userRepo = _userRepo ?? throw new ArgumentNullException(nameof(_userRepo));
			this._productRepo = _productRepo ?? throw new ArgumentNullException(nameof(_productRepo));
		}

		[HttpGet]
		public IActionResult GetAll()
		{
			var items = _reviewRepo.FindAll().ToList();
			return Ok(items);
		}

		[HttpGet("{id:int}")]
		public IActionResult GetByID(int id)
		{
			var result = _reviewRepo.FindByCondition(r => r.ID == id).FirstOrDefault();

			if (result == null)
			{
				return BadRequest();
			}

			return Ok(result);
		}

		[HttpPost]
		public IActionResult Create(Review review)
		{
			if (review == null)
			{
				return BadRequest();
			}

			var userIdExists = _userRepo.FindByCondition(u => u.ID == review.UserID).Any();
			if (!userIdExists)
			{
				return BadRequest("The user id you selected is not found");
			}

			var productIdExists = _productRepo.FindByCondition(p => p.ID == review.ProductID).Any();
			if (!productIdExists)
			{
				return BadRequest("The product id you selected is not found");
			}

			review.ReviewDate = DateTime.UtcNow;

			var result = _reviewRepo.Create(review);
			return Created("review", result);
		}

		[HttpPut]
		public IActionResult Update(Review review)
		{
			if (review == null)
			{
				return BadRequest();
			}

			var exists = _reviewRepo.FindByCondition(r => r.ID == review.ID).Any();

			if (!exists)
			{
				return NotFound();
			}

			var userIdExists = _userRepo.FindByCondition(u => u.ID == review.UserID).Any();
			if (!userIdExists)
			{
				return BadRequest("The user id you selected is not found");
			}

			var productIdExists = _productRepo.FindByCondition(p => p.ID == review.ProductID).Any();
			if (!productIdExists)
			{
				return BadRequest("The product id you selected is not found");
			}

			var result = _reviewRepo.Update(review);
			return NoContent();
		}

		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id)
		{
			if (id == null)
			{
				return BadRequest();
			}

			var exists = _reviewRepo.FindByCondition(r => r.ID == id).Any();

			if (!exists)
			{
				return NotFound();
			}

			var review = _reviewRepo.FindByCondition(r => r.ID == id).FirstOrDefault();

			_reviewRepo.Delete(review);
			return NoContent();
		}
	}
}
