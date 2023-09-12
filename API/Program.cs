using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using API.Context;
using API.Repositories;
using System.Text;

namespace API
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			builder.Services.AddDbContext<MainContext>(o =>
			{
				o.UseSqlServer(builder.Configuration.GetConnectionString("MainDB"));
			});

			// Add services to the container.

			builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
			builder.Services.AddScoped<IOrderRepository, OrderRepository>();
			builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();
			builder.Services.AddScoped<IProductRepository, ProductRepository>();
			builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
			builder.Services.AddScoped<IUserRepository, UserRepository>();

			builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			builder.Services.AddAuthentication("Bearer").AddJwtBearer(o =>
			{
				o.TokenValidationParameters = new()
				{
					ValidateIssuer = false,
					ValidateAudience = false,
					ValidateIssuerSigningKey = true,
					ValidAudience = builder.Configuration["Authentication:Audience"] ?? throw new ArgumentException("Authentication:Audience"),
					ValidIssuer = builder.Configuration["Authentication:Issuer"] ?? throw new ArgumentException("Authentication:Issuer"),
					IssuerSigningKey = new SymmetricSecurityKey
					(Encoding.ASCII.GetBytes(builder.Configuration["Authentication:Secret"] ?? throw new ArgumentException("Authentication:Secret")))
				};
			});

			builder.Services.AddCors((o) =>
			{
				o.AddPolicy("open", b =>
					b.AllowAnyHeader()
					.AllowAnyOrigin()
					.AllowAnyMethod()
				);
			});

			var app = builder.Build();

			using (var scope = app.Services.CreateScope())
			{
				var context = scope.ServiceProvider.GetRequiredService<MainContext>();
				context.Database.Migrate();
			}

			// Configure the HTTP request pipeline.
			//if (app.Environment.IsDevelopment())
			//{
			app.UseSwagger();
			app.UseSwaggerUI();
			//}

			app.UseHttpsRedirection();

			app.UseAuthorization();

			app.UseCors("open");

			app.MapControllers();

			app.Run();
		}
	}
}