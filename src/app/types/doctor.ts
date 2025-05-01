export interface Doctor {
  _id: string;
  name: string;
  speciality: string;
  location: string;
  availability: string;
  experience: string;
  rating: number;
  patients: number;
}

export interface DoctorsResponse {
  doctors: Doctor[];
  currentPage: number;
  totalPages: number;
  totalDoctors: number;
}