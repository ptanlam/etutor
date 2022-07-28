using MediatR;
using PaymentService.Application.Features.Methods.ViewModels;
using PaymentService.Application.Requests;
using PaymentService.Application.Responses;

namespace PaymentService.Application.Features.Methods.Queries.GetMethodsPagedListForUser;

public class GetMethodsPagedListForUser : GetPagedList, IRequest<PagedList<MethodVm>>
{
    public string UserId { get; init; } = string.Empty;
}