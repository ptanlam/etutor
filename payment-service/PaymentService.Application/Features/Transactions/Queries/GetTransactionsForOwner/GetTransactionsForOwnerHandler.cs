using AutoMapper;
using MediatR;
using PaymentService.Application.Contracts.Infrastructure;
using PaymentService.Application.Contracts.Persistence;
using PaymentService.Application.Features.Transactions.ViewModels;
using PaymentService.Application.Responses;
using PaymentService.Domain.Enums;

namespace PaymentService.Application.Features.Transactions.Queries.GetTransactionsForOwner;

public class GetTransactionsForOwnerHandler : IRequestHandler<GetTransactionsForOwner, PagedList<TransactionVm>>
{
    private readonly ITransactionsRepository _transactionsRepository;
    private readonly ICoursesService _coursesService;
    private readonly ITutorsService _tutorsService;
    private readonly IMapper _mapper;

    public GetTransactionsForOwnerHandler(ITransactionsRepository transactionsRepository,
        ICoursesService coursesService, ITutorsService tutorsService, IMapper mapper)
    {
        _transactionsRepository =
            transactionsRepository ?? throw new ArgumentNullException(nameof(transactionsRepository));
        _coursesService = coursesService ?? throw new ArgumentNullException(nameof(coursesService));
        _tutorsService = tutorsService ?? throw new ArgumentNullException(nameof(tutorsService));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<PagedList<TransactionVm>> Handle(GetTransactionsForOwner request,
        CancellationToken cancellationToken)
    {
        var (transactions, totalCount) = await _transactionsRepository.ListForOwnerAsync(request.OwnerId,
            request.PageNumber, request.PageSize, cancellationToken);

        var cachedInfos = new Dictionary<string, string>();
        var transactionVms = await Task.WhenAll(transactions.Select(async t =>
        {
            var transactionVm = _mapper.Map<TransactionVm>(t);

            if (cachedInfos.ContainsKey(t.ItemId))
            {
                transactionVm.ItemName = cachedInfos.GetValueOrDefault(t.ItemId) ?? string.Empty;
            }
            else
            {
                var itemName = t.Type == ItemType.Course
                    ? (await _coursesService.GetCourseInfo(t.ItemId, cancellationToken)).Name
                    : (await _tutorsService.GetTutorInfo(t.ItemId, cancellationToken)).FullName;

                transactionVm.ItemName = itemName;
                cachedInfos.TryAdd(t.ItemId, itemName);
            }

            return transactionVm;
        }));

        return new PagedList<TransactionVm>(transactionVms, request.PageNumber, request.PageSize, totalCount);
    }
}