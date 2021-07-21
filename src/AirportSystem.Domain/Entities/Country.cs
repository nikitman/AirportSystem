using System.Collections.Generic;

namespace AirportSystem.Domain.Entities
{
    public class Country
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<City> Cities { get; set; } = new List<City>();
    }
}