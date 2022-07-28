using AutoMapper;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Application.Features.Subjects.ViewModels;
using CourseService.Application.Features.Syllabi.ViewModels;
using CourseService.Domain.CourseAggregate;
using CourseService.Domain.SubjectAggregate;

namespace CourseService.Application.MappingProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Subject, SubjectVm>();
            CreateMap<Subject, SubjectDetailsVm>().IncludeBase<Subject, SubjectVm>();

            CreateMap<Course, CourseVm>()
                .ForMember(dest => dest.StartAt, opt => opt.MapFrom(src => GetTimeString(src.StartAtHour, src.StartAtMinute)))
                .ForMember(dest => dest.EndAt, opt => opt.MapFrom(src => GetTimeString(src.EndAtHour, src.EndAtMinute)))
                .ForMember(dest => dest.TuitionFeeAmount, opt => opt.MapFrom(src => src.TuitionFee.Amount))
                .ForMember(dest => dest.TuitionFeeUnit, opt => opt.MapFrom(src => src.TuitionFee.Unit));

            CreateMap<OnlineCourse, CourseVm>().IncludeBase<Course, CourseVm>();
            CreateMap<OneOnOneCourse, CourseVm>().IncludeBase<Course, CourseVm>();

            CreateMap<Course, CourseDetailsVm>()
                .ForMember(dest => dest.StartAt, opt => opt.MapFrom(src => GetTimeString(src.StartAtHour, src.StartAtMinute)))
                .ForMember(dest => dest.EndAt, opt => opt.MapFrom(src => GetTimeString(src.EndAtHour, src.EndAtMinute)))
                .ForMember(dest => dest.TuitionFeeAmount, opt => opt.MapFrom(src => src.TuitionFee.Amount))
                .ForMember(dest => dest.TuitionFeeUnit, opt => opt.MapFrom(src => src.TuitionFee.Unit));

            CreateMap<OnlineCourse, CourseDetailsVm>().IncludeBase<Course, CourseDetailsVm>();
            CreateMap<OneOnOneCourse, CourseDetailsVm>().IncludeBase<Course, CourseDetailsVm>();

            CreateMap<CourseDetailsVm, GetCourseBasicInfoResponse>();

            CreateMap<Syllabus, SyllabusVm>();
            CreateMap<Syllabus, SyllabusDetailsVm>();
        }

        private static string GetTimeString(int hour, int minute)
        {
            var hourString = hour >= 10 ? $"{hour}" : $"0{hour}";
            var minuteString = minute >= 10 ? $"{minute}" : $"0{minute}";

            return $"{hourString}:{minuteString}";
        }
    }
}