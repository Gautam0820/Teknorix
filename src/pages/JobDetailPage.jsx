import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJobDetails, fetchJobs } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    fetchJobDetails(id).then((res) => {
      const currentJob = res.data;
      setJob(currentJob);
      fetchJobs({ department: currentJob.department.id }).then((r) => {
        const others = r.data.filter((j) => j.id !== currentJob.id);
        setRelatedJobs(others);
      });
    });
  }, [id]);

  if (!job) return <div>Loading...</div>;

  const shareUrl = window.location.href;
  const shareText = `Check out this job opening: ${job.title}`;

  return (
    <div className="job-detail-page" style={{ padding: '20px' }}>
      <h1>{job.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: job.description }} />

  
      <button
        style={{ marginTop: '20px' }}
        onClick={() => navigate(`/apply/${job.id}`)}
      >
        Apply
      </button>

      
      <div className="social-share" style={{ marginTop: '30px' }}>
        <h4>Share this job:</h4>
        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebookF} style={{ fontSize: '24px', color: '#4267B2' }} />
          </a>
          <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '24px', color: '#1DA1F2' }} />
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedinIn} style={{ fontSize: '24px', color: '#0077B5' }} />
          </a>
        </div>
      </div>

      
      <h3 style={{ marginTop: '40px' }}>Other openings in {job.department.title}:</h3>
      {relatedJobs.map((j) => (
        <div
          key={j.id}
          onClick={() => navigate(`/jobs/${j.id}`)}
          style={{ cursor: 'pointer', marginTop: '10px', color: 'blue', textDecoration: 'underline' }}
        >
          {j.title}
        </div>
      ))}
    </div>
  );
};

export default JobDetailPage;
