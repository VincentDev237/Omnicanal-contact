const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Route pour ajouter un contact
app.post('/api/contacts', (req, res) => {
  const { firstName, lastName, email, country, phone } = req.body;
  const sql = 'INSERT INTO contacts (firstName, lastName, email, country, phone) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, email, country, phone], (err, result) => {
    if (err) throw err;
    res.status(201).send({ message: 'Contact ajouté avec succès' });
  });
});

// Route pour obtenir tous les contacts
app.get('/api/contacts', (req, res) => {
  const sql = 'SELECT * FROM contacts';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
});

// Route pour obtenir un contact par ID
app.get('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM contacts WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).send({ message: 'Contact non trouvé' });
    } else {
      res.status(200).json(result[0]);
    }
  });
});

// Route pour mettre à jour un contact
app.put('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, country, phone } = req.body;
  const sql = 'UPDATE contacts SET firstName = ?, lastName = ?, email = ?, country = ?, phone = ? WHERE id = ?';
  db.query(sql, [firstName, lastName, email, country, phone, id], (err, result) => {
    if (err) throw err;
    res.status(200).send({ message: 'Contact mis à jour avec succès' });
  });
});

// Route pour supprimer un contact
app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM contacts WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.status(200).send({ message: 'Contact supprimé avec succès' });
  });
});

// Route pour obtenir les contacts filtrés par pays
app.get('/api/contacts', (req, res) => {
  const { country } = req.query;
  let sql = 'SELECT * FROM contacts';
  if (country) {
    sql += ' WHERE country = ?';
  }

  db.query(sql, [country], (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
});


// const upload = multer({ storage: multer.memoryStorage() }); 
// app.post('/api/import-contacts', upload.single('file'), (req, res) => { 
//   const workbook = xlsx.read(req.file.buffer, { type: 'buffer' }); 
//   const sheetName = workbook.SheetNames[0]; 
//   const sheet = workbook.Sheets[sheetName]; 
//   const data = xlsx.utils.sheet_to_json(sheet); 
//   data.forEach(contact => { 
//     const { firstName, lastName, email, country, phone } = contact; 
//     const sql = 'INSERT INTO contacts (firstName, lastName, email, country, phone) VALUES (?, ?, ?, ?, ?)'; 
//     db.query(sql, [firstName, lastName, email, country, phone], (err) => { 
//       if (err) console.error('Erreur lors de l\'ajout du contact', err); 
//     }); 
//   }); 
//   res.status(201).send({ message: 'Contacts importés avec succès' }); 
// });

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port: ${port}`);
});
