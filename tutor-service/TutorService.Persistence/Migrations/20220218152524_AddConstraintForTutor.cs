using Microsoft.EntityFrameworkCore.Migrations;

namespace TutorService.Persistence.Migrations
{
    public partial class AddConstraintForTutor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Tutors_UserId",
                table: "Tutors",
                column: "UserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tutors_UserId",
                table: "Tutors");
        }
    }
}
