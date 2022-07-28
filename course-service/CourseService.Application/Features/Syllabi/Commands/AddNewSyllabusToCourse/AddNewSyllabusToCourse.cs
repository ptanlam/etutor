using System;
using System.Collections.Generic;
using CourseService.Application.Features.Syllabi.ViewModels;
using CourseService.Domain.CourseAggregate;
using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace CourseService.Application.Features.Syllabi.Commands.AddNewSyllabusToCourse
{
    public class AddNewSyllabusToCourse : AddNewSyllabus, 
        IRequest<(List<ValidationFailure> errors, SyllabusVm syllabus)>
    {
        public OnlineCourse Course { get; set; }
        
    }
}