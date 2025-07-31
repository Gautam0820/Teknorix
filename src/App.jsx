
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobListPage from './pages/JobListPage';
import JobDetailPage from './pages/JobDetailPage';
import Header from './components/Header';
import ApplicationPage from './pages/ApplicationPage';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<JobListPage />} />
      <Route path="/apply/:id" element={<ApplicationPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
    </Routes>
  </Router>
);

export default App;
