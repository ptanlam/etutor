namespace PaymentService.Application.Features.Orders.ViewModels;

public class OrderVm
{
    public string Id { get; init; } = string.Empty;
    public string Status { get; init; } = string.Empty;
    public IEnumerable<Link> Links { get; init; } = new List<Link>();
}

public class Link
{
    public string Href { get; init; } = string.Empty;
    public string Rel { get; init; } = string.Empty;
    public string Method { get; init; } = string.Empty;
}