using Microsoft.EntityFrameworkCore.Migrations;

namespace EnrollmentService.Persistence.Migrations
{
    public partial class AddedMoney : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cost",
                table: "Enrollments");

            migrationBuilder.AddColumn<decimal>(
                name: "TuitionAmount",
                table: "Enrollments",
                type: "decimal(17,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TuitionName",
                table: "Enrollments",
                type: "nvarchar(3)",
                maxLength: 3,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TuitionAmount",
                table: "Enrollments");

            migrationBuilder.DropColumn(
                name: "TuitionName",
                table: "Enrollments");

            migrationBuilder.AddColumn<string>(
                name: "Cost",
                table: "Enrollments",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
