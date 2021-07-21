using System;

using AirportSystem.Domain.Enums;

namespace AirportSystem.Domain.Entities
{
    public class Flight
    {
        public int Id { get; set; }

        public TimeSpan Duration { get; set; }

        public FlightStatus Status { get; set; }

        public DateTime StartTime { get; set; }

        public int DepartureAirportId { get; set; }

        public int ArrivalAirportId { get; set; }

        public Airport DepartureAirport { get; set; }

        public Airport ArrivalAirport { get; set; }
    }
}