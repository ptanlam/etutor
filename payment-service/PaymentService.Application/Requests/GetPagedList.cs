namespace PaymentService.Application.Requests;

public class GetPagedList
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}