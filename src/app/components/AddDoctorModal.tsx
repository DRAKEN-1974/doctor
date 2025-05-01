'use client'

import { useState } from 'react';
import { addDoctor } from '../utils/api';

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddDoctorModal({ isOpen, onClose, onSuccess }: AddDoctorModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    speciality: '',
    location: '',
    availability: '',
    experience: '',
    rating: 0,
    patients: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addDoctor(formData);
      onSuccess();
      setFormData({
        name: '',
        speciality: '',
        location: '',
        availability: '',
        experience: '',
        rating: 0,
        patients: 0
      });
    } catch (err) {
      setError('Failed to add doctor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="add-doctor-modal-overlay">
      <div className="add-doctor-modal">
        <div className="add-doctor-modal-header">
          <h2>Add New Doctor</h2>
          <button onClick={onClose} className="modal-close-btn">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-doctor-form">
          <div className="form-row">
            <div className="form-group">
              <label>Doctor Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. John Doe"
              />
            </div>

            <div className="form-group">
              <label>Speciality</label>
              <select
                required
                value={formData.speciality}
                onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
              >
                <option value="">Select Speciality</option>
                <option value="General Physician">General Physician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="New York"
              />
            </div>

            <div className="form-group">
              <label>Availability</label>
              <input
                type="text"
                required
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                placeholder="Mon-Fri"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Experience</label>
              <input
                type="text"
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="15+ years"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                required
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                placeholder="4.5"
              />
            </div>

            <div className="form-group">
              <label>Total Patients</label>
              <input
                type="number"
                required
                min="0"
                value={formData.patients}
                onChange={(e) => setFormData({ ...formData, patients: parseInt(e.target.value) })}
                placeholder="1000"
              />
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'Adding...' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}