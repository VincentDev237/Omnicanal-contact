import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link  } from 'react-router-dom';
import API_URL from '../../services/config';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ViewContact: React.FC = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const query = useQuery();
  const country = query.get('country');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API_URL}/contacts`, {
          params: { country }
        });
        const sortedContacts = response.data.sort((a, b) => a.firstName.localeCompare(b.firstName));
        setContacts(sortedContacts);
      } catch (error) {
        console.error('Erreur lors de la récupération des contacts', error);
      }
    };

    fetchContacts();
  }, [country]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        try {
          await axios.post(`${API_URL}/import-contacts`, jsonData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          alert('Contacts importés avec succès');
          navigate(0); // Recharger la page pour afficher les contacts importés
        } catch (error) {
          console.error('Erreur lors de l\'importation des contacts', error);
          alert('Erreur lors de l\'importation des contacts');
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const exportToExcel = async () => {
    try {
      const response = await axios.get(`${API_URL}/contacts`);
      const contacts = response.data;

      // Convertir les contacts en une feuille Excel
      const worksheet = XLSX.utils.json_to_sheet(contacts);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

      // Générer le fichier Excel et déclencher le téléchargement
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(data, 'contacts.xlsx');
    } catch (error) {
      console.error('Erreur lors de l\'exportation des contacts', error);
      alert('Erreur lors de l\'exportation des contacts');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Liste des Contacts</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="form-control mb-3" />
      <button onClick={exportToExcel} className="btn btn-primary mb-3">
        Exporter les Contacts
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Pays</th>
            <th>Numéro de Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.country}</td>
              <td>{contact.phone}</td>
              <td>
                <Link to={`/edit-contact/${contact.id}`} className="btn btn-warning me-2">Modifier</Link>
                <Link to={`/delete-contact/${contact.id}`} className="btn btn-danger">Supprimer</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewContact;
