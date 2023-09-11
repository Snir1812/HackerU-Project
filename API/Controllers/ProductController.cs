using API.Models.DTO;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ProductController : Controller
	{
		private readonly IConfiguration _config;
		private readonly IProductRepository _productRepo;
		private readonly ICategoryRepository _categoryRepo;

		public ProductController(IConfiguration _config, IProductRepository _productRepo, ICategoryRepository _categoryRepo)
		{
			this._config = _config ?? throw new ArgumentNullException(nameof(_config));
			this._productRepo = _productRepo ?? throw new ArgumentNullException(nameof(_productRepo));
			this._categoryRepo = _categoryRepo ?? throw new ArgumentNullException(nameof(_categoryRepo));
		}

		[HttpGet]
		public IActionResult GetAll()
		{
			var items = _productRepo
				.FindAll()
				.Include(p => p.Reviews) // Include reviews related to the product
				.ToList();
			return Ok(items);
		}

		[HttpGet("{id:int}")]
		public IActionResult GetByID(int id)
		{
			var result = _productRepo
			   .FindByCondition(p => p.ID == id)
			   .Include(p => p.Reviews) // Include reviews related to the product
			   .FirstOrDefault();

			if (result == null)
			{
				return BadRequest();
			}

			return Ok(result);
		}

		[HttpPost]
		public IActionResult Create(Product product)
		{
			if (product == null)
			{
				return BadRequest();
			}

			var categoryIdExists = _categoryRepo.FindByCondition(c => c.ID == product.CategoryID).Any();
			if (!categoryIdExists)
			{
				return BadRequest("The category id you selected is not found");
			}

			var productNameExists = _productRepo.FindByCondition(p => p.ProductName == product.ProductName).Any();
			if (productNameExists)
			{
				return BadRequest("The product name you selected is already in use");
			}

			var result = _productRepo.Create(product);
			return Created("product", result);
		}

		[HttpPut]
		public IActionResult Update(Product product)
		{
			if (product == null)
			{
				return BadRequest();
			}

			var exists = _productRepo.FindByCondition(p => p.ID == product.ID).Any();

			if (!exists)
			{
				return NotFound();
			}

			var categoryIdExists = _categoryRepo.FindByCondition(c => c.ID == product.CategoryID).Any();
			if (!categoryIdExists)
			{
				return BadRequest("The category id you selected is not found");
			}

			var otherProductsWithSameName = _productRepo.FindByCondition(p => p.ProductName == product.ProductName && p.ID != product.ID).Any();
			if (otherProductsWithSameName)
			{
				return BadRequest("The product name you selected is already in use");
			}

			var result = _productRepo.Update(product);
			return NoContent();
		}

		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id)
		{
			if (id == null)
			{
				return BadRequest();
			}

			var exists = _productRepo.FindByCondition(p => p.ID == id).Any();

			if (!exists)
			{
				return NotFound();
			}

			var product = _productRepo.FindByCondition(p => p.ID == id).FirstOrDefault();

			_productRepo.Delete(product);
			return NoContent();
		}
	}
}
