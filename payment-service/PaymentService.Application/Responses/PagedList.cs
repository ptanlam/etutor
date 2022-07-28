namespace PaymentService.Application.Responses;

public class PagedList<T> : List<T>
{
    public int CurrentPage { get; }
    public int PageSize { get; }
    public int TotalPage { get; }
    public int TotalCount { get; }

    public PagedList(IEnumerable<T> source, int currentPage, int pageSize, int totalCount)
    {
        CurrentPage = currentPage;
        PageSize = pageSize;
        TotalPage = (int) Math.Ceiling(totalCount * 1.0 / pageSize);
        TotalCount = totalCount;
        AddRange(source);
    }
}