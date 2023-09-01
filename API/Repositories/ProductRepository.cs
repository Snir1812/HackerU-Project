using API.Models.DTO;
using API.Context;
using API.Repositories;

namespace API.Repositories
{
	public class ProductRepository : RepositoryBase<Product>, IProductRepository
	{
		public ProductRepository(MainContext _context)
		: base(_context)
		{
		}
	}
}
