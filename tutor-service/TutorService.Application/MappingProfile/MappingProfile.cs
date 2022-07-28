using System.Linq;
using AutoMapper;
using TutorService.Application.Features.Certificates.ViewModels;
using TutorService.Application.Features.Degrees.ViewModels;
using TutorService.Application.Features.Rentals.ViewModels;
using TutorService.Application.Features.Tutors.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.MappingProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Tutor, TutorVm>()
                .ForMember(dest => dest.RentalAmount, 
                    opt => opt.MapFrom(src => src.Rentals.FirstOrDefault(r => r.IsActive).Cost.Amount))
                .ForMember(dest => dest.RentalUnit,
                    opt => opt.MapFrom(src => src.Rentals.FirstOrDefault(r => r.IsActive).Cost.Unit));
            
            CreateMap<Tutor, TutorDetailsVm>().IncludeBase<Tutor, TutorVm>();
            CreateMap<Tutor, GetTutorBasicInfoResponse>();

            CreateMap<Certificate, CertificateVm>();

            CreateMap<Degree, DegreeVm>();

            CreateMap<Rental, RentalVm>()
                .ForMember(
                    dest => dest.Amount, 
                    option => option.MapFrom(src => src.Cost.Amount))
                .ForMember(
                    dest => dest.Unit, 
                    option => option.MapFrom(src => src.Cost.Unit));

            CreateMap<File, Image>();
        }
    }
}