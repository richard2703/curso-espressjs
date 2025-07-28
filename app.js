require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
console.log(`El puerto es: ${PORT}`);

app.get('/', (req, res) => {
  res.send(`
      <h1>Curso Express.js V3</h1>jy
      <p>Esto es una aplicación node.js con express.js</p>
      <p>Corre en el  puerto: ${PORT}</p>
    `);
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`El ID del usuario es: ${userId}`);
});

app.get('/buscar', (req, res) => {
    const terms = req.query.termino || 'no hay termino de busqueda';
    const category = req.query.categoria || 'todas';
    res.send(`
        <h1>Buscar</h1>
        <p>Termino de busqueda: ${terms}</p>
        <p>Categoria: ${category}</p>
    `);
});

app.post('/form', (req, res) => {
//    const { nombre, email } = req.body; 
  const name = req.body.nombre || 'Anonimo';
  const email = req.body.email || 'No proporcionado';
  res.json({
    message: 'Datos recibidos',
    data: {
      name,
      email
    }
  });
});

app.post('/api/data', (req, res) => {
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'No se recibieron datos' });
  }

  res.status(201).json({
    message: 'Datos JSON recibidos',
    data
  });
});


app.listen(PORT, () => {
  console.log(`ya funciona la app en el puerto: ${PORT} `);
});