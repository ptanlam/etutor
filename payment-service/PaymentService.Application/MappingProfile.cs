using AutoMapper;
using PaymentService.Application.Features.Methods.ViewModels;
using PaymentService.Application.Features.Transactions.ViewModels;
using PaymentService.Domain.MethodAggregate;
using PaymentService.Domain.TransactionAggregate;

namespace PaymentService.Application;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Method, MethodVm>();
        CreateMap<Transaction, TransactionVm>()
            .ForMember(dest => dest.CreatedAt, cfg => cfg.MapFrom(src => src.Tracking.CreatedAt));
    }
}