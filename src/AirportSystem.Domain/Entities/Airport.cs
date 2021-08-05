using System.Collections.Generic;

namespace AirportSystem.Domain.Entities
{
    public class Airport
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string IATA { get; set; }

        public string ICAO { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public int CityId { get; set; }

        public City City { get; set; }

        public ICollection<Route> InboundRoutes { get; set; } = new List<Route>();

        public ICollection<Route> OutboundRoutes { get; set; } = new List<Route>();
    }
}