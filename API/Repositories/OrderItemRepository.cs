using API.Models.DTO;
using API.Context;
using API.Repositories;

namespace API.Repositories
{
	public class OrderItemRepository : RepositoryBase<OrderItem>, IOrderItemRepository
	{
		public OrderItemRepository(MainContext _context)
		: base(_context)
		{
		}
	}
}
