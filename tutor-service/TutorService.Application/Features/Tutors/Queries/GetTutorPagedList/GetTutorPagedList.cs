using System.Collections.Generic;
using FluentValidation.Results;
using MediatR;
using TutorService.Application.Features.Tutors.ViewModels;
using TutorService.Application.Shared.Requests;
using TutorService.Application.Shared.Responses;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorPagedList
{
    public class GetTutorPagedList : GetPagedList, IRequest<(List<ValidationFailure> errors,
        PagedList<TutorVm> tutorList)>
    {
        public string Name { get; init; }
        public string GenderId { get; init; }
        public string SubjectName { get; init; }
        public string EducationalLevelId { get; init; }
        public string EducationalGradeId { get; init; }
    }
}