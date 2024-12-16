import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import API_URL from '../../services/config';
const DeleteContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      alert('Contact supprimé avec succès');
      navigate('/view-contacts'); // Rediriger vers la liste des contacts
    } catch (error) {
      console.error('Erreur lors de la suppression du contact', error);
      alert('Erreur lors de la suppression du contact');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Supprimer le Contact</h2>
      <p>Êtes-vous sûr de vouloir supprimer ce contact ?</p>
      <button onClick={handleDelete} className="btn btn-danger">Supprimer</button>
    </div>
  );
};

export default DeleteContact;
