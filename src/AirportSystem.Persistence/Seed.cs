using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using AirportSystem.Domain.Entities;

using Microsoft.EntityFrameworkCore;

namespace AirportSystem.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            string airportsJson = File.ReadAllText(@"D:\airports.json");
            string routesJson = File.ReadAllText(@"D:\routes.json");

            FeatureCollection airportsData = JsonSerializer.Deserialize<FeatureCollection>(airportsJson, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            RouteFeatureCollection routesData = JsonSerializer.Deserialize<RouteFeatureCollection>(routesJson, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            if (!await context.Countries.AnyAsync())
            {
                var countries = airportsData.Features.Select(x => x.Properties.Country).Distinct().Select(x => new Country { Name = x }).ToList();
                context.Countries.AddRange(countries);
                await context.SaveChangesAsync();
            }

            if (!await context.Cities.AnyAsync())
            {
                var countries = await context.Countries.ToDictionaryAsync(x => x.Name);
                var cities = new List<City>();

                foreach (var airport in airportsData.Features)
                {
                    cities.Add(new City
                    {
                        Name = airport.Properties.City,
                        CountryId = countries[airport.Properties.Country].Id
                    });
                }

                cities = cities.Distinct(new CityComparer()).ToList();
                context.Cities.AddRange(cities);
                await context.SaveChangesAsync();
            }

            if (!await context.Airports.AnyAsync())
            {
                var cities = await context.Cities.Include(x => x.Country).ToDictionaryAsync(x => $"{x.Country.Name}{x.Name}");
                var airports = new List<Airport>();

                foreach (var airport in airportsData.Features)
                {
                    airports.Add(new Airport
                    {
                        IATA = airport.Properties.FAA,
                        ICAO = airport.Properties.ICAO,
                        Name = airport.Properties.Name,
                        CityId = cities[$"{airport.Properties.Country}{airport.Properties.City}"].Id,
                        Id = int.Parse(airport.Properties.Id),
                        Latitude = airport.Geometry.Coordinates[0],
                        Longitude = airport.Geometry.Coordinates[1],
                    });
                }

                context.Airports.AddRange(airports);
                await context.SaveChangesAsync();
            }

            if (!await context.Routes.AnyAsync())
            {
                var airports = await context.Airports.ToListAsync();
                var routes = new List<Route>();

                foreach (var route in routesData.Features)
                {
                    routes.Add(new Route
                    {
                        OriginId = int.Parse(route.Properties.src_id),
                        DestinationId = int.Parse(route.Properties.dst_id),
                    });
                }

                routes = routes.Distinct(new RouteComparer()).ToList();

                context.Routes.AddRange(routes);
                await context.SaveChangesAsync();
            }

            int airportsCount = await context.Airports.CountAsync();

            if (airportsCount == 7698)
            {
                var airports = await context.Airports
                    .Include(x => x.InboundRoutes)
                    .Include(x => x.OutboundRoutes)
                    .AsSplitQuery()
                    .ToListAsync();

                var toRemove = airports.Where(x => x.InboundRoutes.Count < 1 || x.OutboundRoutes.Count < 1 || x.IATA == @"\N");
                context.Airports.RemoveRange(toRemove);
                await context.SaveChangesAsync();
            }
        }

        private class RouteFeatureCollection
        {
            public string Type { get; set; }

            public RouteFeature[] Features { get; set; }
        }

        private class RouteFeature
        {
            public string Type { get; set; }

            public RouteProperties Properties { get; set; }

            public RouteGeometry Geometry { get; set; }
        }

        private class RouteProperties
        {
            public string src_id { get; set; }
            public string dst_id { get; set; }
        }

        private class RouteGeometry
        {
            public string Type { get; set; }

            public double[][] Coordinates { get; set; }
        }

        private class FeatureCollection
        {
            public string Type { get; set; }

            public Feature[] Features { get; set; }
        }

        private class Feature
        {
            public string Type { get; set; }

            public Properties Properties { get; set; }

            public Geometry Geometry { get; set; }
        }

        private class Properties
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string City { get; set; }
            public string Country { get; set; }
            public string FAA { get; set; }
            public string ICAO { get; set; }
        }

        private class Geometry
        {
            public string Type { get; set; }

            public double[] Coordinates { get; set; }
        }

        private class CityComparer : IEqualityComparer<City>
        {
            public bool Equals(City x, City y)
            {
                return x.Name == y.Name && x.CountryId == y.CountryId;
            }

            public int GetHashCode([DisallowNull] City obj)
            {
                return HashCode.Combine(obj.Name, obj.CountryId);
            }
        }

        private class RouteComparer : IEqualityComparer<Route>
        {
            public bool Equals(Route x, Route y)
            {
                return x.OriginId == y.OriginId && x.DestinationId == y.DestinationId;
            }

            public int GetHashCode([DisallowNull] Route obj)
            {
                return HashCode.Combine(obj.OriginId, obj.DestinationId);
            }
        }
    }
}