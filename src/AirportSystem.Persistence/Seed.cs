using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using AirportSystem.Domain.Entities;
using AirportSystem.Domain.Enums;

using Microsoft.EntityFrameworkCore;

namespace AirportSystem.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (await context.Countries.AnyAsync())
            {
                return;
            }

            var countries = new List<Country>
            {
                new Country { Name = "Ukraine" },
                new Country { Name = "USA" },
                new Country { Name = "Russia" },
                new Country { Name = "Germany" },
                new Country { Name = "Italy" },
            };

            context.Countries.AddRange(countries);
            await context.SaveChangesAsync();

            var cities = new List<City>
            {
                new City { CountryId = countries[0].Id, Name = "Kyiv" },
                new City { CountryId = countries[0].Id, Name = "Kharkiv" },
                new City { CountryId = countries[1].Id, Name = "New York" },
                new City { CountryId = countries[2].Id, Name = "Moscow" },
                new City { CountryId = countries[4].Id, Name = "Rome" },
            };

            context.Cities.AddRange(cities);
            await context.SaveChangesAsync();

            var airports = new List<Airport>
            {
                new Airport { Name = "Борисполь", CityId = cities[0].Id },
                new Airport { Name = "LaGuardia Airport", CityId = cities[2].Id },
                new Airport { Name = "Домодедово", CityId = cities[3].Id },
                new Airport { Name = "Международный аэропорт «Харьков»", CityId = cities[1].Id },
                new Airport { Name = "Leonardo da Vinci International Airport", CityId = cities[4].Id },
            };

            context.Airports.AddRange(airports);
            await context.SaveChangesAsync();

            var flights = new List<Flight>
            {
                new Flight
                {
                    ArrivalAirportId = airports[0].Id,
                    DepartureAirportId = airports[1].Id,
                    Duration = TimeSpan.FromHours(10),
                    StartTime = DateTime.UtcNow,
                    Status = FlightStatus.NotStarted
                },
                new Flight
                {
                    ArrivalAirportId = airports[2].Id,
                    DepartureAirportId = airports[3].Id,
                    Duration = TimeSpan.FromHours(10),
                    StartTime = DateTime.UtcNow,
                    Status = FlightStatus.InProcess
                },
                new Flight
                {
                    ArrivalAirportId = airports[3].Id,
                    DepartureAirportId = airports[2].Id,
                    Duration = TimeSpan.FromHours(10),
                    StartTime = DateTime.UtcNow,
                    Status = FlightStatus.Finished
                },
                new Flight
                {
                    ArrivalAirportId = airports[0].Id,
                    DepartureAirportId = airports[4].Id,
                    Duration = TimeSpan.FromHours(10),
                    StartTime = DateTime.UtcNow,
                    Status = FlightStatus.InProcess
                },
                new Flight
                {
                    ArrivalAirportId = airports[4].Id,
                    DepartureAirportId = airports[0].Id,
                    Duration = TimeSpan.FromHours(10),
                    StartTime = DateTime.UtcNow,
                    Status = FlightStatus.NotStarted
                },
                new Flight
                {
                    ArrivalAirportId = airports[3].Id,
                    DepartureAirportId = airports[0].Id,
                    Duration = TimeSpan.FromHours(10),
                    StartTime = DateTime.UtcNow,
                    Status = FlightStatus.InProcess
                },
                new Flight
                {
                    ArrivalAirportId = airports[1].Id,
                    DepartureAirportId = airports[2].Id,
                    Duration = TimeSpan.FromHours(10),
                    StartTime = DateTime.UtcNow,
                    Status = FlightStatus.NotStarted
                },
                new Flight
                {
                    ArrivalAirportId = airports[2].Id,
                    DepartureAirportId = airports[1].Id,
                    Duration = TimeSpan.FromHours(10),
                    StartTime = DateTime.UtcNow,
                    Status = FlightStatus.InProcess
                },
                new Flight
                {
                    ArrivalAirportId = airports[2].Id,
                    DepartureAirportId = airports[4].Id,
                    Duration = TimeSpan.FromHours(10),
                    StartTime = DateTime.UtcNow,
                    Status = FlightStatus.Finished
                },
                new Flight
                {
                    ArrivalAirportId = airports[4].Id,
                    DepartureAirportId = airports[3].Id,
                    Duration = TimeSpan.FromHours(10),
                    StartTime = DateTime.UtcNow,
                    Status = FlightStatus.NotStarted
                },
            };

            context.Flights.AddRange(flights);
            await context.SaveChangesAsync();
        }
    }
}