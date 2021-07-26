using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirportSystem.Application.Core
{
    public class PagingParams
    {
        public int Page { get; init; } = 1;

        public int PageSize { get; init; } = 10;
    }
}