using Microsoft.EntityFrameworkCore.Migrations;

namespace TutorService.Persistence.Migrations
{
    public partial class EditTutorField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Gender",
                table: "Tutors",
                newName: "GenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GenderId",
                table: "Tutors",
                newName: "Gender");
        }
    }
}
