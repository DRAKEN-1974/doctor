export default function DoctorCard({ doctor }: { doctor: any }) {
    return (
      <div className="card">
        <h2>{doctor.name}</h2>
        <p>Specialty: {doctor.specialty}</p>
        <p>Experience: {doctor.experience} years</p>
        <p>Location: {doctor.location}</p>
      </div>
    );
  }