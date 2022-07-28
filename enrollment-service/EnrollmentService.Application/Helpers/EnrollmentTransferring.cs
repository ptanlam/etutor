using EnrollmentService.Application.Contracts.Common;
using EnrollmentService.Domain.EnrollmentAggregate;

namespace EnrollmentService.Application.Helpers
{
    public class EnrollmentTransferring : IEnrollmentTransaction
    {
        public (EnrollmentTransaction transaction, Enrollment enrollment) Execute()
        {
            throw new System.NotImplementedException();
        }
    }
}