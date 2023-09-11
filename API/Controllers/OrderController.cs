using API.Models.DTO;
using API.Models.Enums;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class OrderController : Controller
	{
		private readonly IConfiguration _config;
		private readonly IUserRepository _userRepo;
		private readonly IOrderRepository _orderRepo;

		public OrderController(IConfiguration _config, IUserRepository _userRepo, IOrderRepository _orderRepo)
		{
			this._config = _config ?? throw new ArgumentNullException(nameof(_config));
			this._userRepo = _userRepo ?? throw new ArgumentNullException(nameof(_userRepo));
			this._orderRepo = _orderRepo ?? throw new ArgumentNullException(nameof(_orderRepo));
		}

		[HttpGet]
		public IActionResult GetAll()
		{
			var items = _orderRepo
				.FindAll()
				.Include(o => o.OrderItems) // Include order items related to the order
				.ToList();
			return Ok(items);
		}

		[HttpGet("{id:int}")]
		public IActionResult GetByID(int id)
		{
			var result = _orderRepo
				.FindByCondition(o => o.ID == id)
				.Include(o => o.OrderItems) // Include order items related to the order
				.FirstOrDefault();

			if (result == null)
			{
				return BadRequest();
			}

			return Ok(result);
		}

		[HttpPost]
		public IActionResult Create(Order order)
		{
			if (order == null)
			{
				return BadRequest();
			}

			var userIdExists = _userRepo.FindByCondition(o => o.ID == order.UserID).Any();
			if (!userIdExists)
			{
				return BadRequest("The user id you selected is not found");
			}

			order.OrderStatus = OrderStatus.Ordered;
			order.OrderDate = DateTime.UtcNow;

			var result = _orderRepo.Create(order);
			return Created("order", result);
		}

		[HttpPut]
		public IActionResult Update(Order order)
		{
			if (order == null)
			{
				return BadRequest();
			}

			var exists = _orderRepo.FindByCondition(o => o.ID == order.ID).Any();

			if (!exists)
			{
				return NotFound();
			}

			var userIdExists = _userRepo.FindByCondition(o => o.ID == order.UserID).Any();
			if (!userIdExists)
			{
				return BadRequest("The user id you selected is not found");
			}

			var result = _orderRepo.Update(order);
			return NoContent();
		}

		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id)
		{
			if (id == null)
			{
				return BadRequest();
			}

			var exists = _orderRepo.FindByCondition(o => o.ID == id).Any();

			if (!exists)
			{
				return NotFound();
			}

			var order = _orderRepo.FindByCondition(p => p.ID == id).FirstOrDefault();

			_orderRepo.Delete(order);
			return NoContent();
		}
	}
}
