// archivo: backend/routes/relaciones.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Persona_Relacionada', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { id_persona, id_persona_relacionada, tipo_relacion } = req.body;
  db.query('INSERT INTO Persona_Relacionada (id_persona, id_persona_relacionada, tipo_relacion) VALUES (?, ?, ?)',
    [id_persona, id_persona_relacionada, tipo_relacion], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, message: 'Relación registrada' });
    });
});

router.put('/:id', (req, res) => {
  const { id_persona, id_persona_relacionada, tipo_relacion } = req.body;
  db.query('UPDATE Persona_Relacionada SET id_persona=?, id_persona_relacionada=?, tipo_relacion=? WHERE id=?',
    [id_persona, id_persona_relacionada, tipo_relacion, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Relación actualizada' });
    });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM Persona_Relacionada WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Relación eliminada' });
  });
});

module.exports = router;