using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirportSystem.Application.Core
{
    public class SortingParams
    {
        private string sortBy = "id";

        public string SortBy
        {
            get => sortBy;
            init => sortBy = value.ToLowerInvariant();
        }

        public bool Descending { get; init; } = false;
    }
}
