const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Criar ou abrir um banco de dados SQLite
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados em memória.');

    // Criar a tabela consultations
    db.run(`CREATE TABLE consultations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      localidade TEXT,
      peso TEXT,
      acontecimento TEXT,
      marca TEXT
    )`);
  }
});

// Rota para receber as consultas
app.post('/api/consultations', (req, res) => {
  const { localidade, peso, acontecimento, marca } = req.body;

  // Inserir os dados na tabela
  db.run(`INSERT INTO consultations (localidade, peso, acontecimento, marca) VALUES (?, ?, ?, ?)`,
    [localidade, peso, acontecimento, marca],
    function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, localidade, peso, acontecimento, marca });
    }
  );
});

// Rota para obter todas as consultas
app.get('/api/consultations', (req, res) => {
  db.all(`SELECT * FROM consultations`, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
