// archivo: backend/routes/mantenimientos.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Mantenimiento', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { id_vehiculo, fecha, descripcion, costo } = req.body;
  db.query('INSERT INTO Mantenimiento (id_vehiculo, fecha, descripcion, costo) VALUES (?, ?, ?, ?)',
    [id_vehiculo, fecha, descripcion, costo], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, message: 'Mantenimiento registrado' });
    });
});

router.put('/:id', (req, res) => {
  const { id_vehiculo, fecha, descripcion, costo } = req.body;
  db.query('UPDATE Mantenimiento SET id_vehiculo=?, fecha=?, descripcion=?, costo=? WHERE id_mantenimiento=?',
    [id_vehiculo, fecha, descripcion, costo, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Mantenimiento actualizado' });
    });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM Mantenimiento WHERE id_mantenimiento=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Mantenimiento eliminado' });
  });
});

module.exports = router;