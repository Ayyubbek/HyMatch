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
  getFilteredSortedChosenJobs: () => Job[];
  getFilteredSortedRefusedJobs: () => Job[];
  refuseJob: (jobId: string) => void;
  chooseJob: (jobId: string) => void;
  deleteJob: (jobId: string) => void;
  filters: JobFilters;
  setFilters: (filters: JobFilters) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  getFilteredSortedJobs: () => Job[];
}

export interface JobFilters {
  jobTypes: string[];
  wageRange: [number, number];
  japaneseLevels: string[];
  workDays: string[];
  important: string[];
}

export type SortOption =
  | 'wageHigh'
  | 'wageAverage'
  | 'wageLow'
  | 'commuteHomeShort'
  | 'commuteHomeAverage'
  | 'commuteHomeLong'
  | 'commuteSchoolShort'
  | 'commuteSchoolAverage'
  | 'commuteSchoolLong'
  | 'date';

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs] = useState<Job[]>(mockJobs);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filters, setFilters] = useState<JobFilters>({
    jobTypes: [],
    wageRange: [0, 5000],
    japaneseLevels: [],
    workDays: [],
    important: [],
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
    setApplications((prev) => [...prev, newApplication]);
  };

  // Chosen dan Refused ga o'tkazish
  const refuseJob = (jobId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.jobId === jobId ? { ...app, status: 'refused' as const } : app
      )
    );
  };

  // Refused dan Chosen ga o'tkazish
  const chooseJob = (jobId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.jobId === jobId ? { ...app, status: 'chosen' as const } : app
      )
    );
  };

  // Ishni butunlay o'chirish
  const deleteJob = (jobId: string) => {
    setApplications((prev) => prev.filter((app) => app.jobId !== jobId));
  };

  const getChosenJobs = () => {
    const chosenJobIds = applications
      .filter((app) => app.status === 'chosen')
      .map((app) => app.jobId);
    return jobs.filter((job) => chosenJobIds.includes(job.id));
  };

  const getRefusedJobs = () => {
    const refusedJobIds = applications
      .filter((app) => app.status === 'refused')
      .map((app) => app.jobId);
    return jobs.filter((job) => refusedJobIds.includes(job.id));
  };

  const parseWage = (salary: string): number => {
    // Expect formats like '1000–2000' (no currency) → take upper bound
    const match = salary.match(/([0-9][0-9,]*)\s*[–-]\s*([0-9][0-9,]*)/);
    if (match) {
      const upper = parseInt(match[2].replace(/,/g, ''), 10);
      return isNaN(upper) ? 0 : upper;
    }
    const single = salary.match(/([0-9][0-9,]*)/);
    return single ? parseInt(single[1].replace(/,/g, ''), 10) : 0;
  };

  const toMinutes = (txt: string) => {
    const m = txt.match(/([0-9]+)/);
    return m ? parseInt(m[1], 10) : 99999;
  };

  const applyFiltersAndSort = (source: Job[]): Job[] => {
    let list = [...source];
    // Apply filters
    if (filters.jobTypes.length) {
      const setTypes = new Set(filters.jobTypes.map((t) => t.toLowerCase()));
      list = list.filter((j) => setTypes.has(j.type.toLowerCase()));
    }
    if (filters.japaneseLevels.length) {
      const setLevels = new Set(
        filters.japaneseLevels.map((l) => l.toUpperCase())
      );
      list = list.filter((j) => setLevels.has(j.japaneseLevel.toUpperCase()));
    }
    if (filters.workDays.length) {
      const setDays = new Set(filters.workDays);
      list = list.filter((j) => j.workDays.some((d) => setDays.has(d)));
    }
    if (filters.important.length) {
      const setImportant = new Set(filters.important);
      list = list.filter((j) => j.highlights.some((h) => setImportant.has(h)));
    }
    if (filters.wageRange) {
      const [minW, maxW] = filters.wageRange;
      list = list.filter((j) => {
        const w = parseWage(j.salary);
        return w >= minW && w <= maxW;
      });
    }

    // Sort
    if (sortBy === 'wageHigh') {
      list.sort((a, b) => parseWage(b.salary) - parseWage(a.salary));
    } else if (sortBy === 'wageLow') {
      list.sort((a, b) => parseWage(a.salary) - parseWage(b.salary));
    } else if (sortBy === 'wageAverage') {
      const wages = list.map((j) => parseWage(j.salary));
      const avg = wages.length
        ? wages.reduce((s, v) => s + v, 0) / wages.length
        : 0;
      list.sort(
        (a, b) =>
          Math.abs(parseWage(a.salary) - avg) -
          Math.abs(parseWage(b.salary) - avg)
      );
    } else if (sortBy === 'commuteHomeShort') {
      list.sort(
        (a, b) => toMinutes(a.commuteTimeHome) - toMinutes(b.commuteTimeHome)
      );
    } else if (sortBy === 'commuteHomeLong') {
      list.sort(
        (a, b) => toMinutes(b.commuteTimeHome) - toMinutes(a.commuteTimeHome)
      );
    } else if (sortBy === 'commuteHomeAverage') {
      const mins = list.map((j) => toMinutes(j.commuteTimeHome));
      const avg = mins.length
        ? mins.reduce((s, v) => s + v, 0) / mins.length
        : 0;
      list.sort(
        (a, b) =>
          Math.abs(toMinutes(a.commuteTimeHome) - avg) -
          Math.abs(toMinutes(b.commuteTimeHome) - avg)
      );
    } else if (sortBy === 'commuteSchoolShort') {
      list.sort(
        (a, b) =>
          toMinutes(a.commuteTimeSchool) - toMinutes(b.commuteTimeSchool)
      );
    } else if (sortBy === 'commuteSchoolLong') {
      list.sort(
        (a, b) =>
          toMinutes(b.commuteTimeSchool) - toMinutes(a.commuteTimeSchool)
      );
    } else if (sortBy === 'commuteSchoolAverage') {
      const mins = list.map((j) => toMinutes(j.commuteTimeSchool));
      const avg = mins.length
        ? mins.reduce((s, v) => s + v, 0) / mins.length
        : 0;
      list.sort(
        (a, b) =>
          Math.abs(toMinutes(a.commuteTimeSchool) - avg) -
          Math.abs(toMinutes(b.commuteTimeSchool) - avg)
      );
    } else {
      // 'date' or not sorting: keep original order
    }

    return list;
  };

  const getFilteredSortedJobs = (): Job[] => applyFiltersAndSort(jobs);

  const getFilteredSortedChosenJobs = (): Job[] => {
    const chosenJobIds = applications
      .filter((app) => app.status === 'chosen')
      .map((app) => app.jobId);
    const chosen = jobs.filter((job) => chosenJobIds.includes(job.id));
    return applyFiltersAndSort(chosen);
  };

  const getFilteredSortedRefusedJobs = (): Job[] => {
    const refusedJobIds = applications
      .filter((app) => app.status === 'refused')
      .map((app) => app.jobId);
    const refused = jobs.filter((job) => refusedJobIds.includes(job.id));
    return applyFiltersAndSort(refused);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        applications,
        addApplication,
        getChosenJobs,
        getRefusedJobs,
        getFilteredSortedChosenJobs,
        getFilteredSortedRefusedJobs,
        refuseJob,
        chooseJob,
        deleteJob,
        filters,
        setFilters,
        sortBy,
        setSortBy,
        getFilteredSortedJobs,
      }}
    >
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
