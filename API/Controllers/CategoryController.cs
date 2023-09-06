using API.Models.DTO;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class CategoryController : Controller
	{
		private readonly IConfiguration _config;
		private readonly ICategoryRepository _categoryRepo;

		public CategoryController(IConfiguration _config, ICategoryRepository _categoryRepo)
		{
			this._config = _config ?? throw new ArgumentNullException(nameof(_config));
			this._categoryRepo = _categoryRepo ?? throw new ArgumentNullException(nameof(_categoryRepo));
		}

		[HttpGet]
		public IActionResult GetAll()
		{
			var items = _categoryRepo.FindAll().ToList();
			return Ok(items);
		}

		[HttpGet("{id:int}")]
		public IActionResult GetByID(int id)
		{
			var result = _categoryRepo.FindByCondition(c => c.ID == id).FirstOrDefault();

			if (result == null)
			{
				return BadRequest();
			}

			return Ok(result);
		}

		[HttpPost]
		public IActionResult Create(Category category)
		{
			if (category == null)
			{
				return BadRequest();
			}

			var categoryNameExists = _categoryRepo.FindByCondition(c => c.Name == category.Name).Any();

			if (categoryNameExists)
			{
				return BadRequest("The category name you selected is already in use");
			}

			var result = _categoryRepo.Create(category);
			return Created("category", result);
		}

		[HttpPut]
		public IActionResult Update(Category category)
		{
			if (category == null)
			{
				return BadRequest();
			}

			var exists = _categoryRepo.FindByCondition(u => u.ID == category.ID).Any();

			if (!exists)
			{
				return NotFound();
			}

			var otherCategoriesWithSameName = _categoryRepo.FindByCondition(c => c.Name == category.Name && c.ID != category.ID).Any();

			if (otherCategoriesWithSameName)
			{
				return BadRequest("The category name you selected is already in use");
			}

			var result = _categoryRepo.Update(category);
			return NoContent();
		}

		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id)
		{
			if (id == null)
			{
				return BadRequest();
			}

			var exists = _categoryRepo.FindByCondition(o => o.ID == id).Any();

			if (!exists)
			{
				return NotFound();
			}

			var category = _categoryRepo.FindByCondition(p => p.ID == id).FirstOrDefault();

			_categoryRepo.Delete(category);
			return NoContent();
		}
	}
}
