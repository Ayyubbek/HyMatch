import React, { createContext, useContext, useState } from "react";

interface Job {
  id: string;
  [key: string]: any;
}

interface JobActionContextType {
  chosenJobs: Job[];
  refusedJobs: Job[];
  addToChosen: (job: Job) => void;
  addToRefused: (job: Job) => void;
}

const JobActionContext = createContext<JobActionContextType | null>(null);

export const JobActionProvider = ({ children }: { children: React.ReactNode }) => {
  const [chosenJobs, setChosenJobs] = useState<Job[]>([]);
  const [refusedJobs, setRefusedJobs] = useState<Job[]>([]);

  const addToChosen = (job: Job) => {
    setChosenJobs((prev) => [...prev, job]);
  };

  const addToRefused = (job: Job) => {
    setRefusedJobs((prev) => [...prev, job]);
  };

  return (
    <JobActionContext.Provider
      value={{ chosenJobs, refusedJobs, addToChosen, addToRefused }}
    >
      {children}
    </JobActionContext.Provider>
  );
};

export const useJobAction = () => {
  const context = useContext(JobActionContext);
  if (!context) {
    throw new Error("useJobAction must be used within a JobActionProvider");
  }
  return context;
};
