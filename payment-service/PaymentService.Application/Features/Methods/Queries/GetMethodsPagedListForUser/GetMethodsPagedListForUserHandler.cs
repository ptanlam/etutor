using AutoMapper;
using MediatR;
using PaymentService.Application.Contracts.Persistence;
using PaymentService.Application.Features.Methods.ViewModels;
using PaymentService.Application.Responses;

namespace PaymentService.Application.Features.Methods.Queries.GetMethodsPagedListForUser;

public class GetMethodsPagedListForUserHandler : IRequestHandler<GetMethodsPagedListForUser, PagedList<MethodVm>>
{
    private readonly IMethodsRepository _methodsRepository;
    private readonly IMapper _mapper;

    public GetMethodsPagedListForUserHandler(IMethodsRepository methodsRepository, IMapper mapper)
    {
        _methodsRepository = methodsRepository ?? throw new ArgumentNullException(nameof(methodsRepository));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<PagedList<MethodVm>> Handle(GetMethodsPagedListForUser request,
        CancellationToken cancellationToken)
    {
        var (methods, totalCount) = await _methodsRepository.ListAndCountForUserAsync(request.PageNumber,
            request.PageSize, request.UserId, cancellationToken);

        var methodVms = _mapper.Map<IEnumerable<MethodVm>>(methods);

        return new PagedList<MethodVm>(methodVms, request.PageNumber, request.PageSize, totalCount);
    }
}