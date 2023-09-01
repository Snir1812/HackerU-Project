using API.Models.DTO;
using API.Context;
using API.Repositories;

namespace API.Repositories
{
	public class UserRepository : RepositoryBase<User>, IUserRepository
	{
		public UserRepository(MainContext _context)
		: base(_context)
		{
		}
	}
}
