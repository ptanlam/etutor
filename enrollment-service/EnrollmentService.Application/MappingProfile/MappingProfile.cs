using AutoMapper;
using EnrollmentService.Application.Features.Enrollments.ViewModels;
using EnrollmentService.Domain.EnrollmentAggregate;

namespace EnrollmentService.Application.MappingProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Enrollment, EnrollmentVm>()
                .ForMember(dest => dest.TuitionAmount, opt => opt.MapFrom(src => src.Tuition.Amount))
                .ForMember(dest => dest.TuitionUnit, opt => opt.MapFrom(src => src.Tuition.Unit));
        }
    }
}