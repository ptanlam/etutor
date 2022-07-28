using EnrollmentService.Application.Contracts.Common;
using EnrollmentService.Domain.EnrollmentAggregate.Enums;

namespace EnrollmentService.Application.Helpers
{
    public static class EnrollmentTransactionFactory
    {
        public static IEnrollmentTransaction CreateNew(TransactionType type)
        {
            return type switch
            {
                TransactionType.Transfer => new EnrollmentTransferring(),
                TransactionType.Cancel => new EnrollmentTransferring(),
                TransactionType.Reserve => new EnrollmentTransferring(),
                _ => null
            };
        }
    }
}