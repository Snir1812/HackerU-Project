using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
	/// <inheritdoc />
	public partial class seeddata : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			//category
			migrationBuilder.InsertData(
				table: "Category",
				columns: new[] { "ID", "Description", "Name" },
				values: new object[] { 1, "Furniture for indoor spaces", "Interior furniture" });
			migrationBuilder.InsertData(
				table: "Category",
				columns: new[] { "ID", "Description", "Name" },
				values: new object[] { 2, "Furniture for outdoor spaces", "Outdoor" });
			migrationBuilder.InsertData(
				table: "Category",
				columns: new[] { "ID", "Description", "Name" },
				values: new object[] { 3, "Bed & bath accessories", "Bed & Bath" });
			//user
			migrationBuilder.InsertData(
				table: "User",
				columns: new[] { "ID", "Address", "Email", "FirstName", "LastName", "Password", "PhoneNumber", "Type", "UserName" },
				values: new object[] { 1, "Admin", "Admin@Gmail.com", "Admin", "Admin", "1234", "0500000000", 999, "Admin1234" });
			migrationBuilder.InsertData(
				table: "User",
				columns: new[] { "ID", "Address", "Email", "FirstName", "LastName", "Password", "PhoneNumber", "Type", "UserName" },
				values: new object[] { 2, "Unknown", "Unknown@Gmail.com", "Unknown", "Unknown", "1234", "0500000000", 0, "Unknown1234" });
			//order
			migrationBuilder.InsertData(
				table: "Order",
				columns: new[] { "ID", "OrderDate", "OrderStatus", "TotalPrice", "UserID" },
				values: new object[] { 1, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9307), 1, 620, 1 });
			migrationBuilder.InsertData(
				table: "Order",
				columns: new[] { "ID", "OrderDate", "OrderStatus", "TotalPrice", "UserID" },
				values: new object[] { 2, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9307), 1, 650, 1 });
			migrationBuilder.InsertData(
				table: "Order",
				columns: new[] { "ID", "OrderDate", "OrderStatus", "TotalPrice", "UserID" },
				values: new object[] { 3, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9307), 1, 39, 1 });
			//product
			migrationBuilder.InsertData(
				table: "Product",
				columns: new[] { "ID", "CategoryID", "Description", "ImageUrl", "Price", "ProductName", "StockQuantity" },
				values: new object[] { 1, 1, "Made with classic pillow top styling, our Holden mattress offers an added layer of foam in the top of the bed to cradle your body in total comfort. The Verti-Coil innerspring system will give your body the support you want so that you can get the rest you need, providing amazing comfort and support for all of your pressure points. Want to sleep cooler at night? This open coil spring system supports good airflow so you can do just that keep you cool and comfortable all night long. Plus, the coils isolate movement so you'll stay sound asleep even if there's other movement. Made in the USA.", "877411a7-25fd-4669-9007-6f7e4b694f68.jpg", 350, "Holden Pillow Top Mattress, Queen", 50 });
			migrationBuilder.InsertData(
				table: "Product",
				columns: new[] { "ID", "CategoryID", "Description", "ImageUrl", "Price", "ProductName", "StockQuantity" },
				values: new object[] { 2, 1, "No box spring necessary! Take the work out of assembling a bed frame with a Bedder Base king mattress platform. You'll appreciate the strong metal construction and how it's easy to set up, easy to sleep on, and easy to dismantle and store away. Everything you need for assembling is included. Especially handy for guest rooms.", "760e995f-8cfd-428a-b20f-aa5692907135.jpg", 120, "Bedder Base Mattress Platform, King", 50 });
			migrationBuilder.InsertData(
				table: "Product",
				columns: new[] { "ID", "CategoryID", "Description", "ImageUrl", "Price", "ProductName", "StockQuantity" },
				values: new object[] { 3, 1, "Modern farmhouse meets At Home prices in Honeybloom, our exclusive new brand that celebrates life lived together. While the subtle camelback profile of our Honeybloom king headboard creates a traditional silhouette, the three rows of button tufting adds a glamorous accent to this piece of furniture. This beige fabric headboard also has substantial, durable padding.", "6c97af47-37f8-4ca3-9841-790cd8f4c66b.jpg", 150, "Kane Beige Tufted Headboard, King", 50 });
			migrationBuilder.InsertData(
				table: "Product",
				columns: new[] { "ID", "CategoryID", "Description", "ImageUrl", "Price", "ProductName", "StockQuantity" },
				values: new object[] { 4, 2, "Award-winning London-based fashion designer, illustrator and innovator Tracey Boyd has created a new and exclusive collection for At Home. Now you can enjoy the outdoors while lounging in comfort and style with this 2-piece chair set with cushions. Crafted of metal, all-weather wicker and high-quality water-resistant fabric, these comfy pieces not only look good but are designed to hold up to the elements and provide the ultimate in enjoyment for years to come.", "dc14d266-6dc7-4aac-bf58-ab6c098d9b84.jpg", 330, "2-Piece Steel & Wicker Outdoor Chair Set", 50 });
			migrationBuilder.InsertData(
				table: "Product",
				columns: new[] { "ID", "CategoryID", "Description", "ImageUrl", "Price", "ProductName", "StockQuantity" },
				values: new object[] { 5, 2, "Finish out your outdoor dining arrangement or create a casual seating space with our black Grammercy slat gas fire pit. Designed to live outdoors, this warming element is perfect for chilly evenings on the patio with friends. Understated and featuring a slatted steel design, this fire pit will go anywhere in the garden for a little added comfort.", "6b0d5413-38a8-4756-b3ba-bdb44948646c.jpg", 220, "Grammercy Gas Fire Pit Table Stainless Steel Burner 50000 Btu, 30", 50 });
			migrationBuilder.InsertData(
				table: "Product",
				columns: new[] { "ID", "CategoryID", "Description", "ImageUrl", "Price", "ProductName", "StockQuantity" },
				values: new object[] { 6, 2, "Start roasting marshmallows, hot dogs, or just get cozy with this 35 Baton Rouge fire pit! It features a finish that resists high temperatures. This compact fire pit features metal and mesh to help contain sparks. Includes a spark screen cover prevents wayward embers from escaping. A great addition to any outdoor patio, perfect for chilly evenings outside.", "0cdce474-25eb-41cf-9f2e-48bebdab6854.jpg", 100, "Baton Rouge Fire Pit, 35", 50 });
			migrationBuilder.InsertData(
				table: "Product",
				columns: new[] { "ID", "CategoryID", "Description", "ImageUrl", "Price", "ProductName", "StockQuantity" },
				values: new object[] { 7, 3, "Experience pure bliss with the Premium Hi-Bloom White Hand Towel. Crafted from soft, cotton material, this towel is designed to elevate your everyday routine. Its pristine white color adds a touch of elegance to any bathroom decor. This hand towel is the perfect combination of style and functionality. Whether you're drying your hands or wiping your face, its plush texture provides a gentle touch against your skin. The absorbent cotton material ensures quick drying, making it ideal for busy households or as a convenient addition to your gym bag.", "6280894c-1957-4832-836a-8019ad7c23e5.jpg", 6, "Premium Hi-Bloom White Hand Towel, 16x28", 50 });
			migrationBuilder.InsertData(
				table: "Product",
				columns: new[] { "ID", "CategoryID", "Description", "ImageUrl", "Price", "ProductName", "StockQuantity" },
				values: new object[] { 8, 3, "Introducing the Tao White and Bamboo Toilet Bowl Brush, an essential addition to any bathroom. With its timeless style and sleek white design, this brush effortlessly blends in with any decor. Made from plastic, it guarantees lasting performance. Keep your bathroom clean and hygienic with our Tao White and Bamboo Toilet Bowl Brush. Its ergonomic handle provides a comfortable grip, allowing you to tackle even the toughest stains. The bristles scrub away dirt and grime, leaving your toilet sparkling clean.", "3cf16506-8908-45a6-b85f-804b033f07a7.jpg", 13, "Tao White & Bamboo Toilet Bowl Brush", 50 });
			migrationBuilder.InsertData(
				table: "Product",
				columns: new[] { "ID", "CategoryID", "Description", "ImageUrl", "Price", "ProductName", "StockQuantity" },
				values: new object[] { 9, 3, "Elevate your vanity game with this timeless grey satin nickel tray. Made from metal, it boasts a sleek rectangular design that effortlessly complements any Fresh Start decor theme. Organize and display your favorite cosmetics, perfumes, and jewelry on this stylish vanity tray. The two-tiered design offers ample space for all your essentials, while the mirrored surface adds a touch of sophistication.", "a1f382fd-df7c-482f-a4e0-3807b5b84dc1.jpg", 20, "2-Tier Sotto Satin Nickel Rectangle Mirrored Vanity Tray", 50 });
			//orderItem
			migrationBuilder.InsertData(
				table: "OrderItem",
				columns: new[] { "ID", "OrderID", "PricePerItem", "ProductID", "Quantity" },
				values: new object[] { 1, 1, 350, 1, 1 });
			migrationBuilder.InsertData(
				table: "OrderItem",
				columns: new[] { "ID", "OrderID", "PricePerItem", "ProductID", "Quantity" },
				values: new object[] { 2, 1, 120, 2, 1 });
			migrationBuilder.InsertData(
				table: "OrderItem",
				columns: new[] { "ID", "OrderID", "PricePerItem", "ProductID", "Quantity" },
				values: new object[] { 3, 1, 150, 3, 1 });
			migrationBuilder.InsertData(
				table: "OrderItem",
				columns: new[] { "ID", "OrderID", "PricePerItem", "ProductID", "Quantity" },
				values: new object[] { 4, 2, 330, 4, 1 });
			migrationBuilder.InsertData(
				table: "OrderItem",
				columns: new[] { "ID", "OrderID", "PricePerItem", "ProductID", "Quantity" },
				values: new object[] { 5, 2, 220, 5, 1 });
			migrationBuilder.InsertData(
				table: "OrderItem",
				columns: new[] { "ID", "OrderID", "PricePerItem", "ProductID", "Quantity" },
				values: new object[] { 6, 2, 100, 6, 1 });
			migrationBuilder.InsertData(
				table: "OrderItem",
				columns: new[] { "ID", "OrderID", "PricePerItem", "ProductID", "Quantity" },
				values: new object[] { 7, 3, 6, 7, 1 });
			migrationBuilder.InsertData(
				table: "OrderItem",
				columns: new[] { "ID", "OrderID", "PricePerItem", "ProductID", "Quantity" },
				values: new object[] { 8, 3, 13, 8, 1 });
			migrationBuilder.InsertData(
				table: "OrderItem",
				columns: new[] { "ID", "OrderID", "PricePerItem", "ProductID", "Quantity" },
				values: new object[] { 9, 3, 20, 9, 1 });
			//review
			migrationBuilder.InsertData(
				table: "Review",
				columns: new[] { "ID", "ProductID", "Rating", "ReviewDate", "ReviewText", "UserID" },
				values: new object[] { 1, 1, 10, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9286), "Good product", 1 });
			migrationBuilder.InsertData(
					table: "Review",
					columns: new[] { "ID", "ProductID", "Rating", "ReviewDate", "ReviewText", "UserID" },
					values: new object[] { 2, 2, 10, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9286), "Good product", 1 });
			migrationBuilder.InsertData(
					table: "Review",
					columns: new[] { "ID", "ProductID", "Rating", "ReviewDate", "ReviewText", "UserID" },
					values: new object[] { 3, 3, 10, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9286), "Good product", 1 });
			migrationBuilder.InsertData(
					table: "Review",
					columns: new[] { "ID", "ProductID", "Rating", "ReviewDate", "ReviewText", "UserID" },
					values: new object[] { 4, 4, 10, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9286), "Good product", 1 });
			migrationBuilder.InsertData(
					table: "Review",
					columns: new[] { "ID", "ProductID", "Rating", "ReviewDate", "ReviewText", "UserID" },
					values: new object[] { 5, 5, 10, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9286), "Good product", 1 });
			migrationBuilder.InsertData(
					table: "Review",
					columns: new[] { "ID", "ProductID", "Rating", "ReviewDate", "ReviewText", "UserID" },
					values: new object[] { 6, 6, 10, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9286), "Good product", 1 });
			migrationBuilder.InsertData(
					table: "Review",
					columns: new[] { "ID", "ProductID", "Rating", "ReviewDate", "ReviewText", "UserID" },
					values: new object[] { 7, 7, 10, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9286), "Good product", 1 });
			migrationBuilder.InsertData(
					table: "Review",
					columns: new[] { "ID", "ProductID", "Rating", "ReviewDate", "ReviewText", "UserID" },
					values: new object[] { 8, 8, 10, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9286), "Good product", 1 });
			migrationBuilder.InsertData(
					table: "Review",
					columns: new[] { "ID", "ProductID", "Rating", "ReviewDate", "ReviewText", "UserID" },
					values: new object[] { 9, 9, 10, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9286), "Good product", 1 });
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DeleteData(
				table: "OrderItem",
				keyColumn: "ID",
				keyValue: 1);

			migrationBuilder.DeleteData(
				table: "Review",
				keyColumn: "ID",
				keyValue: 1);

			migrationBuilder.DeleteData(
				table: "Order",
				keyColumn: "ID",
				keyValue: 1);

			migrationBuilder.DeleteData(
				table: "Product",
				keyColumn: "ID",
				keyValue: 1);

			migrationBuilder.DeleteData(
				table: "Category",
				keyColumn: "ID",
				keyValue: 1);

			migrationBuilder.DeleteData(
				table: "User",
				keyColumn: "ID",
				keyValue: 1);
		}
	}
}
