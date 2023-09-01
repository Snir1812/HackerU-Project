using API.Models.DTO;
using API.Context;
using API.Repositories;

namespace API.Repositories
{
	public class ReviewRepository : RepositoryBase<Review>, IReviewRepository
	{
		public ReviewRepository(MainContext _context)
		: base(_context)
		{
		}
	}
}
