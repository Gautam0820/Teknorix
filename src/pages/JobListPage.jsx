import React, { useEffect, useState } from 'react';
import { fetchJobs, fetchLookups } from '../services/api';
import Filters from '../components/Filters';
import JobGroup from '../components/JobGroup';
import JobCard from '../components/JobCard';

const JobListPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    location: ''
  });

  const [jobs, setJobs] = useState([]);
  const [lookups, setLookups] = useState({});

  useEffect(() => {
    fetchLookups().then((res) => {
      setLookups(res.data);
    });
  }, []);

  useEffect(() => {
    fetchJobs(filters)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch jobs:', err);
      });
  }, [filters]);

  const filteredJobs = jobs.filter((job) => {
    const matchSearch = filters.search
      ? job.title?.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    const matchDepartment = filters.department
      ? job.department?.title?.toLowerCase() === filters.department.toLowerCase()
      : true;

    const matchLocation = filters.location
      ? job.location?.toLowerCase() === filters.location.toLowerCase()
      : true;

    return matchSearch && matchDepartment && matchLocation;
  });

  const isFilterApplied =
    filters.search.trim() !== '' || filters.department || filters.location;

  const grouped = filteredJobs.reduce((acc, job) => {
    const dept = job.department?.title || 'Others';
    acc[dept] = acc[dept] || [];
    acc[dept].push(job);
    return acc;
  }, {});

  return (
    <div className="job-list-page">
      <Filters filters={filters} setFilters={setFilters} lookups={lookups} />

      {filteredJobs.length === 0 ? (
        <p>No matching jobs found.</p>
      ) : isFilterApplied ? (
        filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        Object.entries(grouped).map(([dept, jobList]) => (
          <JobGroup key={dept} department={dept} jobs={jobList} />
        ))
      )}
    </div>
  );
};

export default JobListPage;
