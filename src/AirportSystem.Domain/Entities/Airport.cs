using System.Collections.Generic;

namespace AirportSystem.Domain.Entities
{
    public class Airport
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int CityId { get; set; }

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }

        public string FormattedCoordinates => $"{Latitude},{Longitude}";

        public City City { get; set; }

        public ICollection<Flight> InboundFlights { get; set; } = new List<Flight>();

        public ICollection<Flight> OutboundFlights { get; set; } = new List<Flight>();
    }
}