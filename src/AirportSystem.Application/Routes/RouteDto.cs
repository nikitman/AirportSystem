using AirportSystem.Application.Airports;

namespace AirportSystem.Application.Routes
{
    public class RouteDto
    {
        public int Id { get; set; }

        public int OriginId { get; set; }

        public int DestinationId { get; set; }

        public AirportDto Origin { get; set; }

        public AirportDto Destination { get; set; }
    }
}