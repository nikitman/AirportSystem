using System;

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

        public DbSet<Route> Routes { get; set; }

        public DbSet<City> Cities { get; set; }

        public DbSet<Country> Countries { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            //optionsBuilder.LogTo(Console.WriteLine);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Airport>().ToTable("Airport");
            modelBuilder.Entity<Route>().ToTable("Route");
            modelBuilder.Entity<City>().ToTable("City");
            modelBuilder.Entity<Country>().ToTable("Country");

            modelBuilder.Entity<Airport>().Property(x => x.Id).ValueGeneratedNever();

            modelBuilder.Entity<Airport>()
                .HasMany(x => x.InboundRoutes)
                .WithOne(x => x.Destination)
                .HasForeignKey(x => x.DestinationId);

            modelBuilder.Entity<Airport>()
                .HasMany(x => x.OutboundRoutes)
                .WithOne(x => x.Origin)
                .HasForeignKey(x => x.OriginId);
        }
    }
}