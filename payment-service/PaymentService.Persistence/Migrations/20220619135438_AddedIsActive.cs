using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PaymentService.Persistence.Migrations
{
    public partial class AddedIsActive : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Methods",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Methods");
        }
    }
}
