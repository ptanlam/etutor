using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Auth0.ManagementApi.Models;
using Auth0.ManagementApi.Paging;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using IdentityService.Application.Contracts.Persistence;
using IdentityService.Application.Features.Users.ViewModels;
using MediatR;

namespace IdentityService.Application.Features.Users.Queries.GetUserPagedList
{
    public class GetUserPagedListHandler : IRequestHandler<GetUserPagedList, (List<ValidationFailure> errors, 
        IPagedList<UserVm> users)>
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<GetUserPagedList> _validator;

        public GetUserPagedListHandler(IUsersRepository usersRepository, IMapper mapper, 
            IValidator<GetUserPagedList> validator)
        {
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
        }
        
        public async Task<(List<ValidationFailure> errors, IPagedList<UserVm> users)> Handle(GetUserPagedList request, 
            CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);
            
            var users = await _usersRepository.GetPagedList(request.PageNumber, request.PageSize);

            var userVms = new PagedList<UserVm>(new List<UserVm>(), users.Paging);
            userVms.AddRange(users.Select(user => _mapper.Map<UserVm>(user)));

            return (null, userVms);
        }
    }
}