using Microsoft.EntityFrameworkCore.Migrations;

namespace CourseService.Persistence.Migrations
{
    public partial class AddOnlineAndOneOnOneCourse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Syllabi_Courses_CourseId",
                table: "Syllabi");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "Syllabi",
                newName: "OnlineCourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Syllabi_CourseId",
                table: "Syllabi",
                newName: "IX_Syllabi_OnlineCourseId");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Courses",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(250)",
                oldMaxLength: 250);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Courses",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Courses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "MaxNumberOfStudents",
                table: "Courses",
                type: "int",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Syllabi_Courses_OnlineCourseId",
                table: "Syllabi",
                column: "OnlineCourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Syllabi_Courses_OnlineCourseId",
                table: "Syllabi");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "MaxNumberOfStudents",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "OnlineCourseId",
                table: "Syllabi",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Syllabi_OnlineCourseId",
                table: "Syllabi",
                newName: "IX_Syllabi_CourseId");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Courses",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(250)",
                oldMaxLength: 250,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Courses",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Syllabi_Courses_CourseId",
                table: "Syllabi",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
