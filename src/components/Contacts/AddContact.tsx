import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../services/config';

const AddContact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/contacts`, formData);
      alert('Contact ajouté avec succès');
      // Réinitialiser le formulaire
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        phone: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du contact', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter un Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="firstName" className="form-label">Prénom</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            placeholder='Entrez votre prénom'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            placeholder='Entrez votre nom'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder='Entrez votre email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Pays</label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            placeholder='Entrez votre pays'
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Numéro de Téléphone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+1234567890"
          />
        </div>
        <button type="submit" className="btn btn-primary">Ajouter Contact</button>
      </form>
    </div>
  );
};

export default AddContact;
