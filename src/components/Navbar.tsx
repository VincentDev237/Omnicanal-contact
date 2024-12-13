import React from "react";
import { Link } from "react-router-dom";
import SearchContact  from "../components/Contacts/SearchContact";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="row w-100 align-items-center">
          
          {/* Logo and Title */}
          <div className="col d-flex align-items-center">
            <i className="m-3 fa fa-address-book"></i>
            <span className="navbar-brand mb-0 h1"><b>Mes Contacts</b></span>
          </div>

          {/* Search Component */}
          <div className="col">
            <SearchContact />
          </div>

          {/* Additional Navbar Items (if any) */}
          <div className="col d-flex justify-content-end">
            {/* Placeholder for future navbar items (e.g., user profile, settings) */}
              <Link to="/add-contact" className="btn btn-primary"> 
                Ajouter Contact 
              </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
