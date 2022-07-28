export interface Enrollment {
  id: string;
  studentId: string;
  tuitionAmount: number;
  tuitionUnit: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;

  //* one-on-one does not have pre-created course
  courseId?: string;
}
