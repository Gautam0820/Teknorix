
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ApplicationPage = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Application submitted for Job ID: ${id}`);
    console.log(formData);
  };

  return (
    <div className="application-page">
      <h2>Apply for Job ID: {id}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Resume:</label><br />
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationPage;
