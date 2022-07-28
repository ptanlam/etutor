using Microsoft.EntityFrameworkCore.Migrations;

namespace CourseService.Persistence.Migrations
{
    public partial class EditTuitionColumnNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TuitionFee_Unit",
                table: "Courses",
                newName: "TuitionFeeUnit");

            migrationBuilder.RenameColumn(
                name: "TuitionFee_Amount",
                table: "Courses",
                newName: "TuitionFeeAmount");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TuitionFeeUnit",
                table: "Courses",
                newName: "TuitionFee_Unit");

            migrationBuilder.RenameColumn(
                name: "TuitionFeeAmount",
                table: "Courses",
                newName: "TuitionFee_Amount");
        }
    }
}
