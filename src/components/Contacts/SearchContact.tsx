import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchContact: React.FC = () => {
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/view-contacts?country=${pays}`);
  };

  return (
    <form className="d-flex m-2" role="search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Recherche par pays"
        aria-label="Search"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
};

export default SearchContact;
