// archivo: backend/routes/personas.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all personas
router.get('/', (req, res) => {
  db.query('SELECT * FROM Persona', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Agregar persona
router.post('/', (req, res) => {
  const { nombre, apellido, email, telefono, direccion } = req.body;
  db.query('INSERT INTO Persona (nombre, apellido, email, telefono, direccion) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, email, telefono, direccion], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, message: 'Persona registrada' });
    });
});

// Editar persona
router.put('/:id', (req, res) => {
  const { nombre, apellido, email, telefono, direccion } = req.body;
  db.query('UPDATE Persona SET nombre=?, apellido=?, email=?, telefono=?, direccion=? WHERE id_persona=?',
    [nombre, apellido, email, telefono, direccion, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Persona actualizada' });
    });
});

// Borrar persona
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM Persona WHERE id_persona=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Persona eliminada' });
  });
});

module.exports = router;