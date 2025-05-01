export default function FilterSection({ filters, onFilterChange }: FilterSectionProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      onFilterChange({
        ...filters,
        [name]: value
      });
    };
  
    return (
      <div className="filter-section">
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">
              Speciality
            </label>
            <select
              name="speciality"
              value={filters.speciality}
              onChange={handleChange}
              className="filter-select"
            >
              <option value="">All Specialities</option>
              <option value="General Physician">General Physician</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
            </select>
          </div>
  
          <div className="filter-group">
            <label className="filter-label">
              Location
            </label>
            <select
              name="location"
              value={filters.location}
              onChange={handleChange}
              className="filter-select"
            >
              <option value="">All Locations</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="Houston">Houston</option>
            </select>
          </div>
  
          <div className="filter-group">
            <label className="filter-label">
              Availability
            </label>
            <select
              name="availability"
              value={filters.availability}
              onChange={handleChange}
              className="filter-select"
            >
              <option value="">Any Time</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
        </div>
      </div>
    );
  }