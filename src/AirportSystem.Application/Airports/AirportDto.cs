namespace AirportSystem.Application.Airports
{
    public class AirportDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public int InboundFlightsCount { get; set; }

        public int OutboundFlightsCount { get; set; }
    }
}