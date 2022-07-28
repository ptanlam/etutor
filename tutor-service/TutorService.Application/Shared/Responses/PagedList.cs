using System;
using System.Collections.Generic;
using System.Linq;

namespace TutorService.Application.Shared.Responses
{
    public class PagedList<T> : List<T>
    {
        public PagedList(IReadOnlyCollection<T> items, int pageNumber, int pageSize)
        {
            TotalCount = items.Count;
            PageSize = pageSize;
            CurrentPage = pageNumber;
            TotalPage = (int) Math.Ceiling(TotalCount / (double) pageSize);
            AddRange(items.Skip((pageNumber - 1) * pageSize).Take(pageSize));
        }

        public int TotalCount { get; }
        public int TotalPage { get; }
        public int CurrentPage { get; }
        public int PageSize { get; }
    }
}