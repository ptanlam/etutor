using AutoMapper;
using MediatR;
using PaymentService.Application.Contracts.Persistence;
using PaymentService.Application.Features.Transactions.ViewModels;
using PaymentService.Domain.Enums;
using PaymentService.Domain.TransactionAggregate;

namespace PaymentService.Application.Features.Transactions.Commands.CreateNewTransaction;

public class CreateNewTransactionHandler : IRequestHandler<CreateNewTransaction, TransactionVm>
{
    private readonly ITransactionsRepository _transactionsRepository;
    private readonly IMapper _mapper;

    public CreateNewTransactionHandler(ITransactionsRepository transactionsRepository, IMapper mapper)
    {
        _transactionsRepository =
            transactionsRepository ?? throw new ArgumentNullException(nameof(transactionsRepository));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<TransactionVm> Handle(CreateNewTransaction request, CancellationToken cancellationToken)
    {
        Enum.TryParse<ItemType>(request.Type, true, out var type);
        var transaction = new Transaction(request.OwnerId, request.CostAmount, request.CostUnit, request.ItemId, type,
            request.Action);

        await _transactionsRepository.AddAsync(transaction, cancellationToken);
        return _mapper.Map<TransactionVm>(transaction);
    }
}