using API.Models.DTO;
using API.Context;
using API.Repositories;

namespace API.Repositories
{
	public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
	{
		public CategoryRepository(MainContext _context)
		: base(_context)
		{
		}
	}
}
