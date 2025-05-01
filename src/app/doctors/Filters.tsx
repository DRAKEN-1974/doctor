"use client";

import { useState } from "react";

export default function Filters({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ specialty, location });
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Specialty"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
}