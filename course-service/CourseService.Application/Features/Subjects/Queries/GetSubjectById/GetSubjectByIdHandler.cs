using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Infrastructure;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Subjects.ViewModels;
using CourseService.Domain.CourseAggregate;
using CourseService.Domain.SubjectAggregate;
using MediatR;

namespace CourseService.Application.Features.Subjects.Queries.GetSubjectById
{
    public class GetSubjectByIdHandler : IRequestHandler<GetSubjectById, Subject>
    {
        private readonly ISubjectsRepository _subjectsRepository;

        public GetSubjectByIdHandler(ISubjectsRepository subjectsRepository)
        {
            _subjectsRepository = subjectsRepository ?? throw new ArgumentNullException(nameof(subjectsRepository));
        }

        public async Task<Subject> Handle(GetSubjectById request, CancellationToken cancellationToken)
        {
            return await _subjectsRepository.GetByIdAsync(request.Id);
        }
    }
}