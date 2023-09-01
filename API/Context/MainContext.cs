using Microsoft.EntityFrameworkCore;
using API.Models.DTO;
using API.Models.Enums;

namespace API.Context
{
	public class MainContext : DbContext
	{
		public MainContext(DbContextOptions<MainContext> _options)
			: base(_options) { }
		public DbSet<Category> Category { get; set; }
		public DbSet<Order> Order { get; set; }
		public DbSet<OrderItem> OrderItem { get; set; }
		public DbSet<Product> Product { get; set; }
		public DbSet<Review> Review { get; set; }
		public DbSet<User> User { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<User>().HasData(
						new User
						{
							ID = 1,
							FirstName = "Admin",
							LastName = "Admin",
							Email = "Admin@Gmail.com",
							UserName = "Admin1234",
							Password = "1234",
							Address = "AdminAdminAdmin",
							PhoneNumber = "0500001199",
							Type = UserType.Admin
						});

			modelBuilder.Entity<Category>().HasData(
					new Category
					{
						ID = 1,
						Name = "Home",
						Description = "All for home"
					});

			modelBuilder.Entity<Review>().HasData(
					new Review
					{
						ID = 1,
						ProductID = 1,
						UserID = 1,
						Rating = 10,
						ReviewText = "Lorem",
						ReviewDate = DateTime.UtcNow
					});

			modelBuilder.Entity<Product>().HasData(
					new Product
					{
						ID = 1,
						ProductName = "Product1",
						Description = "Lorem",
						Price = 5,
						StockQuantity = 50,
						CategoryID = 1,
						ImageUrl = "https://picsum.photos/id/237/200/300"
					});

			modelBuilder.Entity<Order>().HasData(
					new Order
					{
						ID = 1,
						UserID = 1,
						OrderDate = DateTime.UtcNow,
						OrderStatus = OrderStatus.Ordered,
						TotalPrice = 20
					});

			modelBuilder.Entity<OrderItem>().HasData(
					new OrderItem
					{
						ID = 1,
						OrderID = 1,
						ProductID = 1,
						Quantity = 4,
						PricePerItem = 5
					});
		}
	}
}
