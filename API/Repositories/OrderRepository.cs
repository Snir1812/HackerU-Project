using API.Models.DTO;
using API.Context;
using API.Repositories;

namespace API.Repositories
{
	public class OrderRepository : RepositoryBase<Order>, IOrderRepository
	{
		public OrderRepository(MainContext _context)
		: base(_context)
		{
		}
	}
}
