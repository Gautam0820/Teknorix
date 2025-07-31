
import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.location.title}</p>
      <button onClick={() => navigate(`/jobs/${job.id}`)}>View</button>
      <button onClick={() => navigate(`/apply/${job.id}`)}>Apply</button>
    </div>
  );
};

export default JobCard;
