import React from 'react';

const Filters = ({ filters, setFilters, lookups }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilter = (key) => {
    const updated = { ...filters };
    delete updated[key];
    setFilters(updated);
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search jobs..."
        name="search"
        value={filters.search || ''}
        onChange={handleChange}
      />

      <select name="department" value={filters.department || ''} onChange={handleChange}>
        <option value="">All Departments</option>
        {lookups?.departments?.map((dept) => (
          <option key={dept.id} value={dept.title}>
            {dept.title}
          </option>
        ))}
      </select>

      <select name="location" value={filters.location || ''} onChange={handleChange}>
        <option value="">All Locations</option>
        {lookups?.locations?.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <div className="active-filters">
        {Object.entries(filters).map(([key, val]) =>
          key !== 'search' && val ? (
            <div key={key} className="filter-badge">
              {key}: {val} <button onClick={() => clearFilter(key)}>X</button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Filters;
