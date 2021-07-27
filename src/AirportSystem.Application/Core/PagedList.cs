using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace AirportSystem.Application.Core
{
    public class PagedList<T>
    {
        public PagedList(IEnumerable<T> items, int count, int page, int pageSize)
        {
            Page = page;
            TotalPages = CalculateTotalPages(count, pageSize);
            PageSize = pageSize;
            TotalCount = count;
            Items = new List<T>(items);
        }

        public int Page { get; }

        public int TotalPages { get; }

        public int PageSize { get; }

        public int TotalCount { get; }

        public List<T> Items { get; }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int page, int pageSize)
        {
            var count = await source.CountAsync();
            int totalPages = CalculateTotalPages(count, pageSize);

            if (page > totalPages)
            {
                page = totalPages;
            }

            var items = await source
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedList<T>(items, count, page, pageSize);
        }

        private static int CalculateTotalPages(int count, int pageSize)
        {
            return (int)Math.Ceiling(count / (double)pageSize);
        }
    }
}