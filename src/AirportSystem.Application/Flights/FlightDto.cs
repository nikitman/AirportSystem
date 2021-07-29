using System;

using AirportSystem.Domain.Enums;

namespace AirportSystem.Application.Flights
{
    public class FlightDto
    {
        public int Id { get; set; }

        public string Duration { get; set; }

        public FlightStatus Status { get; set; }

        public DateTime StartTime { get; set; }

        public int ArrivalAirportId { get; set; }

        public string ArrivalAirportName { get; set; }

        public double ArrivalAirportLatitude { get; set; }

        public double ArrivalAirportLongitude { get; set; }

        public int DepartureAirportId { get; set; }

        public string DepartureAirportName { get; set; }

        public double DepartureAirportLatitude { get; set; }

        public double DepartureAirportLongitude { get; set; }
    }
}