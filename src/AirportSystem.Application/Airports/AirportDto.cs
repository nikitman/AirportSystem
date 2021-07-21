namespace AirportSystem.Application.Airports
{
    public class AirportDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }

        public int InboundFlightsCount { get; set; }

        public int OutboundFlightsCount { get; set; }
    }
}