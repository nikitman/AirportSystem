using AirportSystem.Domain.Entities;

using Microsoft.EntityFrameworkCore;

namespace AirportSystem.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Airport> Airports { get; set; }

        public DbSet<Flight> Flights { get; set; }

        public DbSet<City> Cities { get; set; }

        public DbSet<Country> Countries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Airport>().ToTable("Airport");
            modelBuilder.Entity<Flight>().ToTable("Flight");
            modelBuilder.Entity<City>().ToTable("City");
            modelBuilder.Entity<Country>().ToTable("Country");

            modelBuilder.Entity<Airport>()
                .HasMany(x => x.InboundFlights)
                .WithOne(x => x.ArrivalAirport)
                .HasForeignKey(x => x.ArrivalAirportId);

            modelBuilder.Entity<Airport>()
                .HasMany(x => x.OutboundFlights)
                .WithOne(x => x.DepartureAirport)
                .HasForeignKey(x => x.DepartureAirportId);
        }
    }
}