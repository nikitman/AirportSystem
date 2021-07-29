using System.Collections.Generic;
using System.Threading.Tasks;

using AirportSystem.Application.Flights;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AirportSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlightsController : ControllerBase
    {
        private readonly IMediator mediator;

        public FlightsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<FlightDto>>> GetFlights(int airportId)
        {
            var flights = await mediator.Send(new List.Query { AirportId = airportId });
            return flights;
        }
    }
}