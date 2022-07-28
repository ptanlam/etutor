using Microsoft.EntityFrameworkCore.Migrations;

namespace CourseService.Persistence.Migrations
{
    public partial class AddFieldsForCourse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EndAt",
                table: "Courses",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LearningDays",
                table: "Courses",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StartAt",
                table: "Courses",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndAt",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "LearningDays",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "StartAt",
                table: "Courses");
        }
    }
}
