
import axios from 'axios';

const BASE_URL = 'https://teknorix.jobsoid.com/api/v1';

export const fetchJobs = (filters) => {
  const params = {};

  if (filters.search) params.keyword = filters.search;
  if (filters.department) params.department = filters.department;
  if (filters.location) params.location = filters.location;

  return axios.get(`${BASE_URL}/jobs`, { params });
};

export const fetchLookups = () => {
  return axios.get(`${BASE_URL}/lookups`);
};

export const fetchJobDetails = (id) => {
  return axios.get(`${BASE_URL}/jobs/${id}`);
};
