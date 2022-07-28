using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PaymentService.Persistence.Migrations
{
    public partial class AddedPropertiesForTransaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Cost_Unit",
                table: "Transactions",
                newName: "CostUnit");

            migrationBuilder.RenameColumn(
                name: "Cost_Amount",
                table: "Transactions",
                newName: "CostAmount");

            migrationBuilder.AddColumn<string>(
                name: "Action",
                table: "Transactions",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Transactions",
                type: "int",
                maxLength: 250,
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Action",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "CostUnit",
                table: "Transactions",
                newName: "Cost_Unit");

            migrationBuilder.RenameColumn(
                name: "CostAmount",
                table: "Transactions",
                newName: "Cost_Amount");
        }
    }
}
