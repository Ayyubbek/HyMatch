import { Job } from "@/types/Job";
import React, { createContext, useContext, useState } from "react";

interface JobActionContextType {
  chosenJobs: Job[];
  refusedJobs: Job[];
  addToChosen: (job: Job) => void;
  addToRefused: (job: Job) => void;
  removeFromChosen: (id: string) => void;
  removeFromRefused: (id: string) => void;
}

const JobActionContext = createContext<JobActionContextType | null>(null);

export const JobActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [chosenJobs, setChosenJobs] = useState<Job[]>([]);
  const [refusedJobs, setRefusedJobs] = useState<Job[]>([]);

  const addToChosen = (job: Job) => {
    setChosenJobs((prev) => [...prev, job]);
  };

  const addToRefused = (job: Job) => {
    setRefusedJobs((prev) => [...prev, job]);
  };

  const removeFromChosen = (id: string) => {
    setChosenJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const removeFromRefused = (id: string) => {
    setRefusedJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <JobActionContext.Provider
      value={{
        chosenJobs,
        refusedJobs,
        addToChosen,
        addToRefused,
        removeFromChosen,
        removeFromRefused,
      }}
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
