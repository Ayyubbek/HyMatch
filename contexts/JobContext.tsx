import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Job } from '@/types/Job';
import { JobApplication } from '@/types/JobApplication';
import { mockJobs } from '@/data/mockJobs';

interface JobContextType {
  jobs: Job[];
  applications: JobApplication[];
  addApplication: (jobId: string, status: 'chosen' | 'refused') => void;
  getChosenJobs: () => Job[];
  getRefusedJobs: () => Job[];
  filters: JobFilters;
  setFilters: (filters: JobFilters) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

export interface JobFilters {
  jobTypes: string[];
  wageRange: [number, number];
  japaneseLevels: string[];
  workDays: string[];
}

export type SortOption = 'wage' | 'commute' | 'date';

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs] = useState<Job[]>(mockJobs);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filters, setFilters] = useState<JobFilters>({
    jobTypes: [],
    wageRange: [0, 5000],
    japaneseLevels: [],
    workDays: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>('date');

  const addApplication = (jobId: string, status: 'chosen' | 'refused') => {
    const newApplication: JobApplication = {
      id: Date.now().toString(),
      jobId,
      userId: 'current-user',
      status,
      appliedAt: new Date(),
    };
    setApplications(prev => [...prev, newApplication]);
  };

  const getChosenJobs = () => {
    const chosenJobIds = applications
      .filter(app => app.status === 'chosen')
      .map(app => app.jobId);
    return jobs.filter(job => chosenJobIds.includes(job.id));
  };

  const getRefusedJobs = () => {
    const refusedJobIds = applications
      .filter(app => app.status === 'refused')
      .map(app => app.jobId);
    return jobs.filter(job => refusedJobIds.includes(job.id));
  };

  return (
    <JobContext.Provider value={{
      jobs,
      applications,
      addApplication,
      getChosenJobs,
      getRefusedJobs,
      filters,
      setFilters,
      sortBy,
      setSortBy,
    }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}