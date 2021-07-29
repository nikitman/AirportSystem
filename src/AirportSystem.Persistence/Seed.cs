using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AirportSystem.Domain.Entities;
using AirportSystem.Domain.Enums;

using Microsoft.EntityFrameworkCore;

namespace AirportSystem.Persistence
{
    public class Seed
    {
        private static readonly Random random = new Random();
        private static readonly string alphabet = "QWERTYUIOPASDFGHJKLZXCVBNM";

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

            Enumerable.Range(0, 100).ToList().ForEach(n => airports.Add(new Airport
            {
                Name = new string(alphabet.OrderBy(c => random.Next(0, 26)).Take(10).ToArray()),
                CityId = cities[random.Next(0, 5)].Id,
                Latitude = Math.Round(random.NextDouble() * 180 - 90, 4),
                Longitude = Math.Round(random.NextDouble() * 360 - 180, 4),
            }));

            context.Airports.AddRange(airports);
            await context.SaveChangesAsync();

            var flights = new List<Flight>();

            foreach (var airport in airports)
            {
                Enumerable.Range(0, 5).ToList().ForEach(n => flights.Add(new Flight
                {
                    Status = FlightStatus.NotStarted,
                    Duration = TimeSpan.FromHours(random.Next(6, 25)),
                    StartTime = new DateTime(
                        2021,
                        random.Next(8, 12),
                        random.Next(1, 31),
                        random.Next(1, 24),
                        0,
                        0
                    ),
                    ArrivalAirportId = airport.Id,
                    DepartureAirportId = airports[random.Next(0, 101)].Id
                }));

                Enumerable.Range(0, 5).ToList().ForEach(n => flights.Add(new Flight
                {
                    Status = FlightStatus.NotStarted,
                    Duration = TimeSpan.FromHours(random.Next(6, 25)),
                    StartTime = new DateTime(
                        2021,
                        random.Next(8, 12),
                        random.Next(1, 31),
                        random.Next(1, 24),
                        0,
                        0
                    ),
                    ArrivalAirportId = airports[random.Next(0, 101)].Id,
                    DepartureAirportId = airport.Id
                }));
            }

            context.Flights.AddRange(flights);
            await context.SaveChangesAsync();
        }
    }
}