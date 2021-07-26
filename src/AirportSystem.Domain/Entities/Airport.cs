using System.Collections.Generic;

namespace AirportSystem.Domain.Entities
{
    public class Airport
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int CityId { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public City City { get; set; }

        public ICollection<Flight> InboundFlights { get; set; } = new List<Flight>();

        public ICollection<Flight> OutboundFlights { get; set; } = new List<Flight>();
    }
}