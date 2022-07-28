using AutoMapper;
using MediatR;
using PaymentService.Application.Contracts.Persistence;
using PaymentService.Application.Features.Methods.ViewModels;

namespace PaymentService.Application.Features.Methods.Queries.GetMethodById;

public class GetMethodByIdHandler : IRequestHandler<GetMethodById, MethodVm>
{
    private readonly IMethodsRepository _methodsRepository;
    private readonly IMapper _mapper;

    public GetMethodByIdHandler(IMethodsRepository methodsRepository, IMapper mapper)
    {
        _methodsRepository = methodsRepository ?? throw new ArgumentNullException(nameof(methodsRepository));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<MethodVm> Handle(GetMethodById request, CancellationToken cancellationToken)
    {
        var method = await _methodsRepository.GetByIdAsync(request.Id, cancellationToken);
        return _mapper.Map<MethodVm>(method);
    }
}