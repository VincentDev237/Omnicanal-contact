import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../../services/config';
const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    phone: ''
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`${API_URL}/contacts/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du contact', error);
      }
    };

    fetchContact();
  }, [id]);

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
      await axios.put(`${API_URL}/contacts/${id}`, formData);
      alert('Contact mis à jour avec succès');
      navigate('/view-contacts'); // Utilisation de useNavigate pour naviguer
    } catch (error) {
      console.error('Erreur lors de la mise à jour du contact', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Modifier le Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
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
            placeholder='Entrez votre numéro de téléphone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Mettre à jour le Contact</button>
      </form>
    </div>
  );
};

export default EditContact;
