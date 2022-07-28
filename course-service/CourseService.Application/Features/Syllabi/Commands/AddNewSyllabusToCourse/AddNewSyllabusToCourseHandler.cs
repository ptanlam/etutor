using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Infrastructure;
using CourseService.Application.Contracts.Persistence;
using CourseService.Application.Features.Syllabi.ViewModels;
using CourseService.Domain.CourseAggregate;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Syllabi.Commands.AddNewSyllabusToCourse
{
    public class AddNewSyllabusToCourseHandler : IRequestHandler<AddNewSyllabusToCourse, 
        (List<ValidationFailure> errors, SyllabusVm syllabus)>
    {
        private readonly ICoursesRepository _coursesRepository;
        private readonly IValidator<AddNewSyllabusToCourse> _validator;
        private readonly IFilesService _filesService;
        private readonly IMapper _mapper;

        public AddNewSyllabusToCourseHandler(ICoursesRepository coursesRepository, 
            IValidator<AddNewSyllabusToCourse> validator, IFilesService filesService, IMapper mapper)
        {
            _coursesRepository = coursesRepository ?? throw new ArgumentNullException(nameof(coursesRepository));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _filesService = filesService ?? throw new ArgumentNullException(nameof(filesService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        
        public async Task<(List<ValidationFailure> errors, SyllabusVm syllabus)> Handle(AddNewSyllabusToCourse request, 
            CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return(validationResult.Errors, null);

            var syllabus = new Syllabus(request.Title, request.Description, request.Achievements, request.FromDate, 
                request.ToDate);
            request.Course.AddSyllabus(syllabus);
            await _coursesRepository.UpdateAsync(request.Course);

            var syllabusVm = _mapper.Map<SyllabusVm>(syllabus);
            
            var response = await _filesService.UploadFileListForSyllabus(syllabus.Id, request.Files);
            syllabusVm.Files = response.Files;
            
            return (null, syllabusVm);
        }
    }
}