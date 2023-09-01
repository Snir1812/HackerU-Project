using System.ComponentModel.DataAnnotations;

namespace API.Models
{
	public class LoginInfo
	{
		[Required]
		public string UserName { get; set; } = string.Empty;

		[Required]
		public string Password { get; set; } = string.Empty;
	}
}