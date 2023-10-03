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
			var products = _productRepo
				.FindAll()
				.Include(p => p.Reviews)
				.ToList();

			var productsWithImages = new List<object>();

			foreach (var product in products)
			{
				if (string.IsNullOrEmpty(product.ImageUrl))
				{
					productsWithImages.Add(new
					{
						Product = product,
						ImageBase64 = string.Empty // No image available
					});
				}
				else
				{
					var imagePath = Path.Combine("Images", product.ImageUrl);

					if (System.IO.File.Exists(imagePath))
					{
						byte[] imageData = System.IO.File.ReadAllBytes(imagePath);
						string base64Image = Convert.ToBase64String(imageData);

						productsWithImages.Add(new
						{
							Product = product,
							ImageBase64 = base64Image
						});
					}
					else
					{
						productsWithImages.Add(new
						{
							Product = product,
							ImageBase64 = string.Empty // No image available
						});
					}
				}
			}

			return Ok(productsWithImages);
		}

		[HttpGet("{id:int}")]
		public IActionResult GetByID(int id)
		{
			var result = _productRepo
				.FindByCondition(p => p.ID == id)
				.Include(p => p.Reviews)
				.FirstOrDefault();

			if (result == null)
			{
				return NotFound();
			}

			if (string.IsNullOrEmpty(result.ImageUrl))
			{
				return NotFound("Image URL not found");
			}

			// Construct the file path to the image
			var imagePath = Path.Combine("Images", result.ImageUrl);

			// Check if the image file exists
			if (!System.IO.File.Exists(imagePath))
			{
				return NotFound("Image not found");
			}

			// Read the image file into a byte array
			byte[] imageData = System.IO.File.ReadAllBytes(imagePath);

			// Convert the byte array to a base64-encoded string
			string base64Image = Convert.ToBase64String(imageData);

			// Create a new product object with the base64-encoded image
			var productWithImage = new
			{
				Product = result,
				ImageBase64 = base64Image
			};

			// Return the combined object
			return Ok(productWithImage);
		}

		[HttpPost]
		public IActionResult Create([FromForm] Product product)
		{
			if (product == null || product.ImageFile == null)
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

			var imageName = Guid.NewGuid().ToString() + Path.GetExtension(product.ImageFile.FileName);
			var imagePath = Path.Combine("Images", imageName);
			using (var stream = new FileStream(imagePath, FileMode.Create))
			{
				product.ImageFile.CopyTo(stream);
			}

			product.ImageUrl = imageName;

			var result = _productRepo.Create(product);
			return Created("product", result);
		}

		[HttpPut]
		public IActionResult Update([FromForm] Product product)
		{
			if (product == null)
			{
				return BadRequest();
			}

			var existingProduct = _productRepo.FindByCondition(p => p.ID == product.ID).FirstOrDefault();

			if (existingProduct == null)
			{
				return NotFound();
			}

			// Check if a new image file was provided
			if (product.ImageFile != null)
			{
				// Delete the old image file (if it exists)
				if (!string.IsNullOrEmpty(existingProduct.ImageUrl))
				{
					var oldImagePath = Path.Combine("Images", existingProduct.ImageUrl);
					if (System.IO.File.Exists(oldImagePath))
					{
						System.IO.File.Delete(oldImagePath);
					}
				}

				// Upload the new image file
				var imageName = Guid.NewGuid().ToString() + Path.GetExtension(product.ImageFile.FileName);
				var imagePath = Path.Combine("Images", imageName);
				using (var stream = new FileStream(imagePath, FileMode.Create))
				{
					product.ImageFile.CopyTo(stream);
				}

				// Update the ImageUrl property
				existingProduct.ImageUrl = imageName;
			}

			// Update other properties
			existingProduct.ProductName = product.ProductName;
			existingProduct.Description = product.Description;
			existingProduct.Price = product.Price;
			existingProduct.StockQuantity = product.StockQuantity;
			existingProduct.CategoryID = product.CategoryID;

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

			var result = _productRepo.Update(existingProduct);
			return NoContent();
		}


		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id)
		{
			if (id <= 0)
			{
				return BadRequest();
			}

			var product = _productRepo.FindByCondition(p => p.ID == id).FirstOrDefault();

			if (product == null)
			{
				return NotFound();
			}

			// Delete the associated image file (if it exists)
			if (!string.IsNullOrEmpty(product.ImageUrl))
			{
				var imagePath = Path.Combine("Images", product.ImageUrl);
				if (System.IO.File.Exists(imagePath))
				{
					System.IO.File.Delete(imagePath);
				}
			}

			_productRepo.Delete(product);
			return NoContent();
		}

	}
}
