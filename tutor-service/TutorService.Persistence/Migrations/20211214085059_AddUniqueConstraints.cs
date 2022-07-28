using Microsoft.EntityFrameworkCore.Migrations;

namespace TutorService.Persistence.Migrations
{
    public partial class AddUniqueConstraints : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Tutors_Email",
                table: "Tutors",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tutors_PhoneNumber",
                table: "Tutors",
                column: "PhoneNumber",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tutors_Email",
                table: "Tutors");

            migrationBuilder.DropIndex(
                name: "IX_Tutors_PhoneNumber",
                table: "Tutors");
        }
    }
}
