using Auth0.ManagementApi.Models;
using AutoMapper;
using IdentityService.Application.Features.UserClaims.ViewModels;
using IdentityService.Application.Features.Users.ViewModels;
using IdentityService.Domain.UserAggregate;

namespace IdentityService.Application.MappingProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserVm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.UserId));

            CreateMap<User, UserDetailsVm>()
                .IncludeBase<User, UserVm>()
                .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.Picture));
            
            CreateMap<UserDetailsVm, GetUserDetailsResponse>();
            
            CreateMap<UserClaim, UserClaimVm>();
        }
    }
}