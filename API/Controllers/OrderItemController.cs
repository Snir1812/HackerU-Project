using API.Models.DTO;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class OrderItemController : Controller
	{
		private readonly IConfiguration _config;
		private readonly IOrderItemRepository _orderItemRepo;
		private readonly IOrderRepository _orderRepo;
		private readonly IProductRepository _productRepo;

		public OrderItemController(IProductRepository _productRepo, IOrderRepository _orderRepo, IConfiguration _config, IOrderItemRepository _orderItemRepo)
		{
			this._config = _config ?? throw new ArgumentNullException(nameof(_config));
			this._orderItemRepo = _orderItemRepo ?? throw new ArgumentNullException(nameof(_orderItemRepo));
			this._productRepo = _productRepo ?? throw new ArgumentNullException(nameof(_productRepo));
			this._orderRepo = _orderRepo ?? throw new ArgumentNullException(nameof(_orderRepo));
		}

		[HttpGet]
		public IActionResult GetAll()
		{
			var items = _orderItemRepo.FindAll().ToList();
			return Ok(items);
		}

		[HttpGet("{id:int}")]
		public IActionResult GetByID(int id)
		{
			var result = _orderItemRepo.FindByCondition(o => o.ID == id).FirstOrDefault();

			if (result == null)
			{
				return BadRequest();
			}

			return Ok(result);
		}

		[HttpPost]
		public IActionResult Create(OrderItem orderItem)
		{
			if (orderItem == null)
			{
				return BadRequest();
			}

			var OrderIdExists = _orderRepo.FindByCondition(o => o.ID == orderItem.OrderID).Any();

			if (!OrderIdExists)
			{
				return BadRequest("The order id you selected is not found");
			}

			var ProductIdExists = _productRepo.FindByCondition(p => p.ID == orderItem.ProductID).Any();

			if (!ProductIdExists)
			{
				return BadRequest("The product id you selected is not found");
			}

			var result = _orderItemRepo.Create(orderItem);
			return Created("orderItem", result);
		}

		[HttpPut]
		public IActionResult Update(OrderItem orderItem)
		{
			if (orderItem == null)
			{
				return BadRequest();
			}

			var OrderIdExists = _orderRepo.FindByCondition(o => o.ID == orderItem.OrderID).Any();

			if (!OrderIdExists)
			{
				return BadRequest("The order id you selected is not found");
			}

			var ProductIdExists = _productRepo.FindByCondition(p => p.ID == orderItem.ProductID).Any();

			if (!ProductIdExists)
			{
				return BadRequest("The product id you selected is not found");
			}

			var result = _orderItemRepo.Update(orderItem);
			return NoContent();
		}

		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id)
		{
			if (id == null)
			{
				return BadRequest();
			}

			var exists = _orderItemRepo.FindByCondition(o => o.ID == id).Any();

			if (!exists)
			{
				return NotFound();
			}

			var orderItem = _orderItemRepo.FindByCondition(p => p.ID == id).FirstOrDefault();

			_orderItemRepo.Delete(orderItem);
			return NoContent();
		}
	}
}
