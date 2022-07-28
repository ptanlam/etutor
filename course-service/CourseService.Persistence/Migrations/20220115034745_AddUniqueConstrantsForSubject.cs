using Microsoft.EntityFrameworkCore.Migrations;

namespace CourseService.Persistence.Migrations
{
    public partial class AddUniqueConstrantsForSubject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Subjects_TutorId_Name",
                table: "Subjects");

            migrationBuilder.CreateIndex(
                name: "IX_Subjects_TutorId_Name_EducationalLevelId_EducationalGradeId",
                table: "Subjects",
                columns: new[] { "TutorId", "Name", "EducationalLevelId", "EducationalGradeId" },
                unique: true,
                filter: "[EducationalGradeId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Subjects_TutorId_Name_EducationalLevelId_EducationalGradeId",
                table: "Subjects");

            migrationBuilder.CreateIndex(
                name: "IX_Subjects_TutorId_Name",
                table: "Subjects",
                columns: new[] { "TutorId", "Name" },
                unique: true);
        }
    }
}
