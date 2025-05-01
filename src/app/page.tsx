'use client'

import { useState, useEffect } from 'react';
import { fetchDoctors } from './utils/api';
import { Doctor, DoctorsResponse } from './types/doctor';
import DoctorCard from './components/DoctorCard';
import FilterSection from './components/FilterSection';
import AddDoctorModal from './components/AddDoctorModal';

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    speciality: '',
    location: '',
    availability: ''
  });

  const loadDoctors = async (page: number, currentFilters = filters) => {
    try {
      setLoading(true);
      const data: DoctorsResponse = await fetchDoctors(page, currentFilters);
      setDoctors(data.doctors);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error('Error loading doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors(1);
  }, []);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    loadDoctors(1, newFilters);
  };

  const handlePageChange = (newPage: number) => {
    loadDoctors(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <main className="container">
      <div className="header-section">
        <h1 className="main-title">Find Doctors & Book Appointment</h1>
        <div className="add-doctor-container">
          <button
            onClick={() => setIsModalOpen(true)}
            className="add-doctor-btn"
          >
            <span className="add-doctor-icon">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </span>
            <span className="add-doctor-text">Add Doctor</span>
          </button>
        </div>
      </div>
      
      <FilterSection filters={filters} onFilterChange={handleFilterChange} />

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>

          {doctors.length === 0 && (
            <div className="no-results">
              <p>No doctors found matching your criteria</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <AddDoctorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          loadDoctors(currentPage);
          setIsModalOpen(false);
        }} 
      />
    </main>
  );
}