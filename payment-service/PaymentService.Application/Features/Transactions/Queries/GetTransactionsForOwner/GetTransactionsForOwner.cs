using MediatR;
using PaymentService.Application.Features.Transactions.ViewModels;
using PaymentService.Application.Requests;
using PaymentService.Application.Responses;

namespace PaymentService.Application.Features.Transactions.Queries.GetTransactionsForOwner;

public class GetTransactionsForOwner : GetPagedList, IRequest<PagedList<TransactionVm>>
{
    public string OwnerId { get; init; } = string.Empty;
}