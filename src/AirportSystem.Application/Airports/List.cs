using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

using AirportSystem.Application.Core;
using AirportSystem.Domain.Enums;
using AirportSystem.Persistence;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace AirportSystem.Application.Airports
{
    public class List
    {
        public class Query : IRequest<PagedList<AirportDto>>
        {
            private static readonly Dictionary<string, Expression<Func<AirportDto, object>>> sortByExpressions = new()
            {
                ["id"] = a => a.Id,
                ["name"] = a => a.Name,
                ["city"] = a => a.City,
                ["country"] = a => a.Country,
                ["latitude"] = a => a.Latitude,
                ["longitude"] = a => a.Longitude,
                ["inboundflights"] = a => a.InboundFlightsCount,
                ["outboundflights"] = a => a.OutboundFlightsCount,
            };

            public PagingParams Paging { get; init; } = new();

            public SortingParams Sorting { get; init; } = new();

            public bool IsAllowedToSortBy(string property)
            {
                return sortByExpressions.ContainsKey(property.ToLowerInvariant());
            }

            public Expression<Func<AirportDto, object>> GetSortByExpression(string property)
            {
                return sortByExpressions[property.ToLowerInvariant()];
            }
        }

        public class Handler : IRequestHandler<Query, PagedList<AirportDto>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<PagedList<AirportDto>> Handle(Query request, CancellationToken cancellationToken = default)
            {
                if (!request.IsAllowedToSortBy(request.Sorting.SortBy))
                {
                    throw new ArgumentOutOfRangeException(nameof(request.Sorting.SortBy), "Invalid sorting property");
                }

                var query = context.Airports.AsNoTracking();

                query = context.Airports
                    .Include(x => x.City)
                        .ThenInclude(x => x.Country);

                var projection = query
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
                    });

                var sortByExpression = request.GetSortByExpression(request.Sorting.SortBy);

                projection = request.Sorting.Descending
                    ? projection.OrderByDescending(sortByExpression)
                    : projection.OrderBy(sortByExpression);

                return await PagedList<AirportDto>.CreateAsync(
                    projection, request.Paging.Page, request.Paging.PageSize);
            }
        }
    }
}