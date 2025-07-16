// archivo: backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/personas', require('./routes/personas'));
app.use('/api/vehiculos', require('./routes/vehiculos'));
app.use('/api/mantenimientos', require('./routes/mantenimientos'));
app.use('/api/relaciones', require('./routes/relaciones'));

app.listen(3001, () => console.log('Servidor backend en http://localhost:3001'));
