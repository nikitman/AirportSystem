namespace AirportSystem.Domain.Entities
{
    public class Route
    {
        public int Id { get; set; }

        public int OriginId { get; set; }

        public int DestinationId { get; set; }

        public Airport Origin { get; set; }

        public Airport Destination { get; set; }
    }
}