using System;

namespace TutorService.Domain.Common
{
    public class BaseEntity<T>
    {
        public T Id { get; protected set; }
    }
}