using TutorService.Application.Features.Tutors.ViewModels;

namespace TutorService.Application.Features.Tutors.Helper
{
    public static class TutorHelper
    {
        public static void AssignUserDetailsToTutor(TutorVm tutor, GetUserDetailsResponse userDetails)
        {
            tutor.FirstName = userDetails.FirstName;
            tutor.LastName = userDetails.LastName;
            tutor.FullName = userDetails.FullName;
            tutor.Gender = userDetails.Gender;
            tutor.DateOfBirth = userDetails.DateOfBirth;

            if (tutor is not TutorDetailsVm tutorDetailsVm) return;
            tutorDetailsVm.PhoneNumber = userDetails.PhoneNumber;
            tutorDetailsVm.Email = userDetails.Email;
        }
    }
}