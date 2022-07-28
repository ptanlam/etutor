using MassTransit;
using MediatR;
using PaymentService.Application.Features.Transactions.Commands.CreateNewTransaction;
using PaymentService.Infrastructure.IntegrationMessages.Commands;

namespace PaymentService.Infrastructure.IntegrationMessages.Consumers;

public class CreateNewTransactionConsumer : IConsumer<CreateNewTransactionCommand>
{
    private readonly IMediator _mediator;

    public CreateNewTransactionConsumer(IMediator mediator)
    {
        _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
    }

    public async Task Consume(ConsumeContext<CreateNewTransactionCommand> context)
    {
        var payload = context.Message;
        var request = new CreateNewTransaction
        {
            OwnerId = payload.OwnerId,
            Action = payload.Action,
            CostAmount = payload.CostAmount,
            CostUnit = payload.CostUnit,
            ItemId = payload.ItemId,
            Type = payload.Type
        };

        await _mediator.Send(request);
    }
}