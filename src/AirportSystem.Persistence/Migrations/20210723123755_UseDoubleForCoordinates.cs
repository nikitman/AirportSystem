using Microsoft.EntityFrameworkCore.Migrations;

namespace AirportSystem.Persistence.Migrations
{
    public partial class UseDoubleForCoordinates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Longitude",
                table: "Airport",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<double>(
                name: "Latitude",
                table: "Airport",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "Airport",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "Airport",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");
        }
    }
}