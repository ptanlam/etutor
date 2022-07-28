export interface SessionBulkCreationDto {
  courseId: string;
  ownerId: string;
  enrollmentId: string;
  startDate: number;
  endDate: number;
  // Monday,Wednesday,Friday
  learningDays: string;
  // Start time (HH:mm)
  startAt: string;
  // End time (HH:mm)
  endAt: string;
}

export interface SessionBulkCreationMessage {
  message: SessionBulkCreationDto;
}
