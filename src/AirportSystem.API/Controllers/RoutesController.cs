using System.Collections.Generic;
using System.Threading.Tasks;

using AirportSystem.Application.Routes;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AirportSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoutesController : ControllerBase
    {
        private readonly IMediator mediator;

        public RoutesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<RouteDto>>> GetRoutes(int airportId, bool includeOrigin = false, bool includeDestination = false)
        {
            var routes = await mediator.Send(new List.Query { AirportId = airportId, IncludeOrigin = includeOrigin, IncludeDestination = includeDestination });
            return routes;
        }
    }
}