export interface CheckOverlappingSessionRequest {
  startDate: number;
  endDate: number;
  startAt: string;
  endAt: string;
  learningDays: string;
  ownerId: string;
}
