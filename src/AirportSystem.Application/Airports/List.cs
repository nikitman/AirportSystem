using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using AirportSystem.Domain.Enums;
using AirportSystem.Persistence;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace AirportSystem.Application.Airports
{
    public class List
    {
        public class Query : IRequest<List<AirportDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<AirportDto>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<AirportDto>> Handle(Query request, CancellationToken cancellationToken = default)
            {
                var result = await context.Airports
                    .Include(x => x.City)
                        .ThenInclude(x => x.Country)
                    .Select(x => new AirportDto
                    {
                        Id = x.Id,
                        Name = x.Name,
                        City = x.City.Name,
                        Country = x.City.Country.Name,
                        Latitude = x.Latitude,
                        Longitude = x.Longitude,
                        InboundFlightsCount = x.InboundFlights.Where(y => y.Status == FlightStatus.NotStarted || y.Status == FlightStatus.InProcess).Count(),
                        OutboundFlightsCount = x.OutboundFlights.Where(y => y.Status == FlightStatus.NotStarted || y.Status == FlightStatus.InProcess).Count(),
                    })
                    .ToListAsync();

                return result;
            }
        }
    }
}