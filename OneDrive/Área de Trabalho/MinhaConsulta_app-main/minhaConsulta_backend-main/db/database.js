const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./consultas.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criar a tabela de usuários
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS consultations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicleLocation TEXT NOT NULL,
    weight REAL NOT NULL,
    incidentType TEXT NOT NULL,
    vehicleBrand TEXT NOT NULL
)`);
});

module.exports = db;