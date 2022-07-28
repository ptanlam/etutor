using AutoMapper;
using MediatR;
using PaymentService.Application.Contracts.Persistence;
using PaymentService.Application.Features.Methods.ViewModels;
using PaymentService.Domain.MethodAggregate;

namespace PaymentService.Application.Features.Methods.Commands.AddNewMethod;

public class AddNewMethodHandler : IRequestHandler<AddNewMethod, MethodVm>
{
    private readonly IMethodsRepository _methodsRepository;
    private readonly IMapper _mapper;

    public AddNewMethodHandler(IMethodsRepository methodsRepository, IMapper mapper)
    {
        _methodsRepository = methodsRepository ?? throw new ArgumentNullException(nameof(methodsRepository));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<MethodVm> Handle(AddNewMethod request, CancellationToken cancellationToken)
    {
        var method = new Method(request.UserId, request.CardNumber, request.Expiry, request.Name, request.Cvc);
        await _methodsRepository.AddAsync(method, cancellationToken);
        return _mapper.Map<MethodVm>(method);
    }
}