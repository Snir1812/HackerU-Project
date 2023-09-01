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
            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "ID", "Description", "Name" },
                values: new object[] { 1, "All for home", "Home" });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "ID", "Address", "Email", "FirstName", "LastName", "Password", "PhoneNumber", "Type", "UserName" },
                values: new object[] { 1, "AdminAdminAdmin", "Admin@Gmail.com", "Admin", "Admin", "1234", "0500001199", 999, "Admin1234" });

            migrationBuilder.InsertData(
                table: "Order",
                columns: new[] { "ID", "OrderDate", "OrderStatus", "TotalPrice", "UserID" },
                values: new object[] { 1, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9307), 1, 20m, 1 });

            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "ID", "CategoryID", "Description", "ImageUrl", "Price", "ProductName", "StockQuantity" },
                values: new object[] { 1, 1, "Lorem", "https://picsum.photos/id/237/200/300", 5m, "Product1", 50 });

            migrationBuilder.InsertData(
                table: "OrderItem",
                columns: new[] { "ID", "OrderID", "PricePerItem", "ProductID", "Quantity" },
                values: new object[] { 1, 1, 5m, 1, 4 });

            migrationBuilder.InsertData(
                table: "Review",
                columns: new[] { "ID", "ProductID", "Rating", "ReviewDate", "ReviewText", "UserID" },
                values: new object[] { 1, 1, 10, new DateTime(2023, 9, 1, 14, 33, 7, 664, DateTimeKind.Utc).AddTicks(9286), "Lorem", 1 });
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
