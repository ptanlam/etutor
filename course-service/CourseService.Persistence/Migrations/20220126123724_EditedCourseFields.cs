using Microsoft.EntityFrameworkCore.Migrations;

namespace CourseService.Persistence.Migrations
{
    public partial class EditedCourseFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndAt",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "StartAt",
                table: "Courses");

            migrationBuilder.AddColumn<int>(
                name: "EndAtHour",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EndAtMinute",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StartAtHour",
                table: "Courses",
                type: "int",
                maxLength: 10,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StartAtMinute",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndAtHour",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "EndAtMinute",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "StartAtHour",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "StartAtMinute",
                table: "Courses");

            migrationBuilder.AddColumn<string>(
                name: "EndAt",
                table: "Courses",
                type: "nvarchar(10)",
                maxLength: 10,
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
    }
}
