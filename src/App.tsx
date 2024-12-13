// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import  Navbar  from "./components/Navbar";
import AddContact from "./components/Contacts/AddContact";
import ViewContact from "./components/Contacts/ViewContact";
import EditContact from "./components/Contacts/EditContact";
const App = () => {

  return (
    <Router> 
      <Navbar />
      <div className="container mt-4"> 
        <Routes> 
          <Route path="/add-contact" element={<AddContact />} /> 
          <Route path="/edit-contact/:id" element={<EditContact />} />
          <Route path="/" element={<ViewContact/>} />
        </Routes> 
      </div> 
    </Router>
  );
};

export default App;
