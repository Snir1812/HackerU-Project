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
		private readonly IProductRepository _productRepo;

		public OrderController(IConfiguration _config, IUserRepository _userRepo, IOrderRepository _orderRepo, IProductRepository _productRepo)
		{
			this._config = _config ?? throw new ArgumentNullException(nameof(_config));
			this._userRepo = _userRepo ?? throw new ArgumentNullException(nameof(_userRepo));
			this._orderRepo = _orderRepo ?? throw new ArgumentNullException(nameof(_orderRepo));
			this._productRepo = _productRepo ?? throw new ArgumentNullException(nameof(_productRepo));
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

			var userIdExists = _userRepo.FindByCondition(u => u.ID == order.UserID).Any();
			if (!userIdExists)
			{
				return BadRequest("The user id you selected is not found");
			}

			decimal totalOrderPrice = 0;
			List<OrderItem> orderItemsWithInsufficientStock = new List<OrderItem>();

			if (order.OrderItems == null)
			{
				order.TotalPrice = 0;
			}
			else
			{
				foreach (var orderItem in order.OrderItems)
				{
					// Check if there is enough stock for the product
					var product = _productRepo.FindByCondition(p => p.ID == orderItem.ProductID).FirstOrDefault();
					if (product == null || product.StockQuantity < orderItem.Quantity)
					{
						// Add the order item to the list of items with insufficient stock
						orderItemsWithInsufficientStock.Add(orderItem);
					}
					else
					{
						decimal itemTotalPrice = orderItem.PricePerItem * orderItem.Quantity;
						totalOrderPrice += itemTotalPrice;
						// Reduce the stock quantity of the product
						product.StockQuantity -= orderItem.Quantity;
						_productRepo.Update(product);
					}
				}

				if (orderItemsWithInsufficientStock.Count > 0)
				{
					return BadRequest("Insufficient stock for one or more items in the order");
				}

				order.TotalPrice = totalOrderPrice;
			}

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

			var existingOrder = _orderRepo.FindByCondition(o => o.ID == order.ID)
											.Include(o => o.OrderItems)
											.FirstOrDefault();

			if (existingOrder == null)
			{
				return NotFound();
			}

			var userIdExists = _userRepo.FindByCondition(u => u.ID == order.UserID).Any();
			if (!userIdExists)
			{
				return BadRequest("The user id you selected is not found");
			}

			List<OrderItem> orderItemsWithInsufficientStock = new List<OrderItem>();

			if (order.OrderItems != null)
			{
				foreach (var orderItem in order.OrderItems)
				{
					if (orderItem.ID == 0)
					{
						int quantityDifference = orderItem.Quantity;

						var product = _productRepo.FindByCondition(p => p.ID == orderItem.ProductID).FirstOrDefault();

						if (product == null || product.StockQuantity < quantityDifference)
						{
							orderItemsWithInsufficientStock.Add(orderItem);
						}
						else
						{
							product.StockQuantity -= quantityDifference;
							_productRepo.Update(product);

							existingOrder.OrderItems.Add(orderItem);
						}
					}
					else
					{
						var existingOrderItem = existingOrder.OrderItems.FirstOrDefault(oi => oi.ID == orderItem.ID);

						if (existingOrderItem == null)
						{
							return BadRequest("Order item not found in the existing order");
						}

						int quantityDifference = orderItem.Quantity - existingOrderItem.Quantity;

						var product = _productRepo.FindByCondition(p => p.ID == orderItem.ProductID).FirstOrDefault();

						if (product == null || product.StockQuantity < quantityDifference)
						{
							orderItemsWithInsufficientStock.Add(orderItem);
						}
						else
						{
							product.StockQuantity -= quantityDifference;
							_productRepo.Update(product);

							existingOrderItem.Quantity = orderItem.Quantity;
							existingOrderItem.PricePerItem = orderItem.PricePerItem;
						}
					}
				}
			}

			if (orderItemsWithInsufficientStock.Count > 0)
			{
				return BadRequest("Insufficient stock for one or more items in the order");
			}

			decimal totalOrderPrice = existingOrder.OrderItems.Sum(oi => oi.PricePerItem * oi.Quantity);
			existingOrder.TotalPrice = totalOrderPrice;

			_orderRepo.Update(existingOrder);

			return NoContent();
		}


		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id)
		{
			if (id <= 0)
			{
				return BadRequest("Invalid order ID.");
			}

			var order = _orderRepo.FindByCondition(o => o.ID == id)
				.Include(o => o.OrderItems) // Include order items related to the order
				.FirstOrDefault();

			if (order == null)
			{
				return NotFound("Order not found.");
			}

			// Restore product stock quantities
			foreach (var orderItem in order.OrderItems)
			{
				var product = _productRepo.FindByCondition(p => p.ID == orderItem.ProductID).FirstOrDefault();
				if (product != null)
				{
					product.StockQuantity += orderItem.Quantity;
					_productRepo.Update(product);
				}
			}

			// Delete the order
			_orderRepo.Delete(order);

			return NoContent();
		}

	}
}
