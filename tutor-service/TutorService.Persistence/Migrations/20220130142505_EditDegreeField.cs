using Microsoft.EntityFrameworkCore.Migrations;

namespace TutorService.Persistence.Migrations
{
    public partial class EditDegreeField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AcademicRank",
                table: "Degrees",
                newName: "AcademicRankId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AcademicRankId",
                table: "Degrees",
                newName: "AcademicRank");
        }
    }
}
