using System.Threading.Tasks;

using AirportSystem.Application.Airports;
using AirportSystem.Application.Core;

using MediatR;

using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<PagedList<AirportDto>>> GetAirports([FromQuery] PagingParams paging, [FromQuery] SortingParams sorting)
        {
            var airports = await mediator.Send(new List.Query { Paging = paging, Sorting = sorting });
            return airports;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AirportDto>> GetAirport(int id)
        {
            var airport = await mediator.Send(new Details.Query { Id = id });
            return airport;
        }
    }
}