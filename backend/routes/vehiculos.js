// archivo: backend/routes/vehiculos.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Vehiculo', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { id_persona, marca, modelo, año, placa } = req.body;
  db.query('INSERT INTO Vehiculo (id_persona, marca, modelo, año, placa) VALUES (?, ?, ?, ?, ?)',
    [id_persona, marca, modelo, año, placa], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, message: 'Vehículo registrado' });
    });
});

router.put('/:id', (req, res) => {
  const { id_persona, marca, modelo, año, placa } = req.body;
  db.query('UPDATE Vehiculo SET id_persona=?, marca=?, modelo=?, año=?, placa=? WHERE id_vehiculo=?',
    [id_persona, marca, modelo, año, placa, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Vehículo actualizado' });
    });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM Vehiculo WHERE id_vehiculo=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Vehículo eliminado' });
  });
});

module.exports = router;