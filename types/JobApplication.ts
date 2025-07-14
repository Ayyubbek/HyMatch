export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: 'chosen' | 'refused';
  appliedAt: Date;
}