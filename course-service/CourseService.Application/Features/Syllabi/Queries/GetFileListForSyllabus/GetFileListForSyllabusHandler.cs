using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CourseService.Application.Contracts.Infrastructure;
using CourseService.Application.Features.Syllabi.ViewModels;
using MediatR;

namespace CourseService.Application.Features.Syllabi.Queries.GetFileListForSyllabus
{
    public class GetFileListForSyllabusHandler : IRequestHandler<GetFileListForSyllabus, SyllabusDetailsVm>
    {
        private readonly IFilesService _filesService;
        private readonly IMapper _mapper;

        public GetFileListForSyllabusHandler(IFilesService filesService, IMapper mapper)
        {
            _filesService = filesService ?? throw new ArgumentNullException(nameof(filesService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        
        public async Task<SyllabusDetailsVm> Handle(GetFileListForSyllabus request, CancellationToken cancellationToken)
        {
            var syllabusDetailsVm = _mapper.Map<SyllabusDetailsVm>(request.Syllabus);
            syllabusDetailsVm.Files = await _filesService.GetFileListForOwner(request.Syllabus.Id.ToString());
            return syllabusDetailsVm;
        }
    }
}