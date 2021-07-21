using System.Collections.Generic;

namespace AirportSystem.Domain.Entities
{
    public class City
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int CountryId { get; set; }

        public Country Country { get; set; }

        public ICollection<Airport> Airports { get; set; } = new List<Airport>();
    }
}