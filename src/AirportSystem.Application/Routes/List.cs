using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using AirportSystem.Application.Airports;
using AirportSystem.Persistence;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace AirportSystem.Application.Routes
{
    public class List
    {
        public class Query : IRequest<List<RouteDto>>
        {
            public int AirportId { get; set; }
            public bool IncludeOrigin { get; set; }

            public bool IncludeDestination { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<RouteDto>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<RouteDto>> Handle(Query request, CancellationToken cancellationToken = default)
            {
                var query = context.Routes
                    .AsNoTracking()
                    .Include(x => x.Origin)
                        .ThenInclude( x => x.City)
                        .ThenInclude(x => x.Country)
                    .Include(x => x.Destination)
                        .ThenInclude(x => x.City)
                        .ThenInclude(x => x.Country)
                    .Where(x => x.OriginId == request.AirportId || x.DestinationId == request.AirportId)
                    .Select(x => new RouteDto
                    {
                        Id = x.Id,
                        OriginId = x.OriginId,
                        DestinationId = x.DestinationId,
                        Origin = request.IncludeOrigin ? new AirportDto
                        {
                            Id = x.Origin.Id,
                            IATA = x.Origin.IATA,
                            ICAO = x.Origin.ICAO,
                            Name = x.Origin.Name,
                            City = x.Origin.City.Name,
                            Country = x.Origin.City.Country.Name,
                            Latitude = x.Origin.Latitude,
                            Longitude = x.Origin.Longitude,
                            InboundRoutesCount = x.Origin.InboundRoutes.Count,
                            OutboundRoutesCount = x.Origin.OutboundRoutes.Count,
                        } : null,
                        Destination = request.IncludeDestination ? new AirportDto
                        {
                            Id = x.Destination.Id,
                            IATA = x.Destination.IATA,
                            ICAO = x.Destination.ICAO,
                            Name = x.Destination.Name,
                            City = x.Destination.City.Name,
                            Country = x.Destination.City.Country.Name,
                            Latitude = x.Destination.Latitude,
                            Longitude = x.Destination.Longitude,
                            InboundRoutesCount = x.Destination.InboundRoutes.Count,
                            OutboundRoutesCount = x.Destination.OutboundRoutes.Count,
                        } : null
                    });

                return await query.ToListAsync();
            }
        }
    }
}