using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using AirportSystem.Domain.Enums;
using AirportSystem.Persistence;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace AirportSystem.Application.Flights
{
    public class List
    {
        public class Query : IRequest<List<FlightDto>>
        {
            public int AirportId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<FlightDto>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<FlightDto>> Handle(Query request, CancellationToken cancellationToken = default)
            {
                var query = context.Flights
                    .AsNoTracking()
                    .Include(x => x.ArrivalAirport)
                    .Include(x => x.DepartureAirport)
                    .Where(x => x.Status == FlightStatus.NotStarted && x.ArrivalAirportId == request.AirportId || x.DepartureAirportId == request.AirportId)
                    .Select(x => new FlightDto
                    {
                        Id = x.Id,
                        StartTime = x.StartTime,
                        Status = x.Status,
                        Duration = x.Duration.ToString(),

                        ArrivalAirportId = x.ArrivalAirportId,
                        ArrivalAirportName = x.ArrivalAirport.Name,
                        ArrivalAirportLatitude = x.ArrivalAirport.Latitude,
                        ArrivalAirportLongitude = x.ArrivalAirport.Longitude,

                        DepartureAirportId = x.DepartureAirportId,
                        DepartureAirportName = x.DepartureAirport.Name,
                        DepartureAirportLatitude = x.DepartureAirport.Latitude,
                        DepartureAirportLongitude = x.DepartureAirport.Longitude,
                    });

                return await query.ToListAsync();
            }
        }
    }
}