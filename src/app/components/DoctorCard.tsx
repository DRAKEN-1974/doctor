import { Doctor } from '../types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="doctor-card">
      <div className="doctor-header">
        <div className="doctor-avatar">
          {doctor.name.charAt(0)}
        </div>
        
        <div className="doctor-info">
          <h2 className="doctor-name">{doctor.name}</h2>
          <p className="doctor-speciality">{doctor.speciality}</p>
          <p className="doctor-experience">{doctor.experience} experience</p>
          
          <div className="doctor-stats">
            <span className="doctor-rating">
              {doctor.rating} ★
            </span>
            <span className="doctor-patients">
              {doctor.patients}+ patients
            </span>
          </div>

          <div className="doctor-details">
            <p className="doctor-location">📍 {doctor.location}</p>
            <p className="doctor-availability">🕒 {doctor.availability}</p>
          </div>

          <button className="book-btn">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}