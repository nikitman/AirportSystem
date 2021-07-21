using System.Collections.Generic;
using System.Threading.Tasks;

using AirportSystem.Application.Airports;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace AirportSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AirportsController : ControllerBase
    {
        private readonly IMediator mediator;

        public AirportsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<AirportDto>>> GetAirports()
        {
            var airports = await mediator.Send(new List.Query());
            return airports;
        }
    }
}