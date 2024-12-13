import React from 'react';
import axios from 'axios';
import API_URL from '../../services/config';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportContacts: React.FC = () => {
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
      const data = new Blob([excelBuffer], { type: XLSX.utils.book_type_map.xlsx });
      saveAs(data, 'contacts.xlsx');
    } catch (error) {
      console.error('Erreur lors de l\'exportation des contacts', error);
      alert('Erreur lors de l\'exportation des contacts');
    }
  };

  return (
    <button onClick={exportToExcel} className="btn btn-primary">
      Exporter les Contacts
    </button>
  );
};

export default ExportContacts;
