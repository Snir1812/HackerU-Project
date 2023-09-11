using API.Models.DTO;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UserController : Controller
	{
		private readonly IConfiguration _config;
		private readonly IUserRepository _userRepo;

		public UserController(IConfiguration _config, IUserRepository _userRepo)
		{
			this._config = _config ?? throw new ArgumentNullException(nameof(_config));
			this._userRepo = _userRepo ?? throw new ArgumentNullException(nameof(_userRepo));
		}

		[HttpGet]
		public IActionResult GetAll()
		{
			var items = _userRepo
				.FindAll()
				.Include(p => p.Orders) // Include orders related to the user
							.ThenInclude(o => o.OrderItems) // Include order items related to each order
				.Include(p => p.Reviews) // Include reviews related to the user
				.ToList();
			return Ok(items);
		}

		[HttpGet("{id:int}")]
		public IActionResult GetByID(int id)
		{
			var result = _userRepo
				.FindByCondition(u => u.ID == id)
				.Include(p => p.Orders) // Include orders related to the user
							.ThenInclude(o => o.OrderItems) // Include order items related to each order
				.Include(p => p.Reviews) // Include reviews related to the user
				.FirstOrDefault();

			if (result == null)
			{
				return BadRequest();
			}

			return Ok(result);
		}

		[HttpPost]
		public IActionResult Create(User user)
		{
			if (user == null)
			{
				return BadRequest();
			}

			var userNameExists = _userRepo.FindByCondition(u => u.UserName == user.UserName).Any();

			if (userNameExists)
			{
				return BadRequest("The user name you selected is already in use");
			}

			var userEmailExists = _userRepo.FindByCondition(u => u.Email == user.Email).Any();

			if (userEmailExists)
			{
				return BadRequest("The email you selected is already in use");
			}

			var result = _userRepo.Create(user);
			return Created("user", result);
		}

		[HttpPut]
		public IActionResult Update(User user)
		{
			if (user == null)
			{
				return BadRequest();
			}

			var exists = _userRepo.FindByCondition(u => u.ID == user.ID).Any();

			if (!exists)
			{
				return NotFound();
			}

			var otherUsersWithSameUserName = _userRepo.FindByCondition(u => u.UserName == user.UserName && u.ID != user.ID).Any();

			if (otherUsersWithSameUserName)
			{
				return BadRequest("The user name you selected is already in use");
			}

			var otherUsersWithSameEmail = _userRepo.FindByCondition(u => u.Email == user.Email && u.ID != user.ID).Any();

			if (otherUsersWithSameEmail)
			{
				return BadRequest("The email you selected is already in use");
			}

			var result = _userRepo.Update(user);
			return NoContent();
		}

		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id, string userName, string password)
		{
			if (id == null || userName == null || password == null)
			{
				return BadRequest();
			}

			var exists = _userRepo.FindByCondition(u => u.ID == id).Any();

			if (!exists)
			{
				return NotFound();
			}

			var user = _userRepo.FindByCondition(u => u.ID == id).FirstOrDefault();

			if (user.UserName == userName && user.Password == password)
			{
				_userRepo.Delete(user);
				return NoContent();
			}

			return BadRequest();
		}
	}
}



