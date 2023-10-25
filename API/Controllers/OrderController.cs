﻿using API.Models.DTO;
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

		public OrderController(IConfiguration _config, IUserRepository _userRepo, IOrderRepository _orderRepo,IProductRepository _productRepo)
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

			var exists = _orderRepo.FindByCondition(o => o.ID == order.ID).Any();

			if (!exists)
			{
				return NotFound();
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
