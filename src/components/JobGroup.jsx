import React from 'react';
import JobCard from './JobCard';

const JobGroup = ({ department, jobs }) => (
  <div className="job-group">
    <h2>{department}</h2>
    {jobs.map((job) => (
      <JobCard key={job.id} job={job} />
    ))}
  </div>
);

export default JobGroup;
