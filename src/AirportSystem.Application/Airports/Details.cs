using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using AirportSystem.Persistence;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace AirportSystem.Application.Airports
{
    public class Details
    {
        public class Query : IRequest<AirportDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AirportDto>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<AirportDto> Handle(Query request, CancellationToken cancellationToken = default)
            {
                return await context.Airports
                    .AsNoTracking()
                    .Include(x => x.City)
                        .ThenInclude(x => x.Country)
                    .Where(x => x.Id == request.Id)
                    .Select(x => new AirportDto
                    {
                        Id = x.Id,
                        Name = x.Name,
                        IATA = x.IATA,
                        ICAO = x.ICAO,
                        City = x.City.Name,
                        Country = x.City.Country.Name,
                        Latitude = x.Latitude,
                        Longitude = x.Longitude,
                        InboundRoutesCount = x.InboundRoutes.Count,
                        OutboundRoutesCount = x.OutboundRoutes.Count,
                    })
                    .SingleOrDefaultAsync();
            }
        }
    }
}