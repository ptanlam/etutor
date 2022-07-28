using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PaymentService.Persistence.Migrations
{
    public partial class AddedCvc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Cvc",
                table: "Methods",
                type: "nvarchar(3)",
                maxLength: 3,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cvc",
                table: "Methods");
        }
    }
}
