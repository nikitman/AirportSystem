namespace AirportSystem.Application.Airports
{
    public class AirportDto
    {
        public int Id { get; set; }

        public string IATA { get; set; }

        public string ICAO { get; set; }

        public string Name { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public int InboundRoutesCount { get; set; }

        public int OutboundRoutesCount { get; set; }
    }
}