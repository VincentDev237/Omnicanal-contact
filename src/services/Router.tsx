import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddContact from "../components/Contacts/AddContact";
import EditContact from "../components/Contacts/EditContact";
import ViewContact from "../components/Contacts/ViewContact";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route path="/contacts/add-contact" element={<AddContact />} />
        <Route path="/contacts" element={<ViewContact />} />
        <Route path="/contacts/edit-contact:id" element={<EditContact />} />
      </Routes>
    </>
  );
};

export default Router;
