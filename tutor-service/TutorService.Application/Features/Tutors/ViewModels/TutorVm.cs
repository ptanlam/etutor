using System;
using System.Collections.Generic;

namespace TutorService.Application.Features.Tutors.ViewModels
{
    public class TutorVm
    {
        public Guid Id { get; init; }

        public string UserId { get; init; }
        public decimal RentalAmount { get; init; }
        public string RentalUnit { get; init; }
        public DateTime CreatedAt { get; init; }
        public DateTime UpdatedAt { get; init; }

        // Identity Service
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string DateOfBirth { get; set; }
        public string Gender { get; set; }

        // Storage Service
        public IEnumerable<File> Images { get; set; }
    }
}