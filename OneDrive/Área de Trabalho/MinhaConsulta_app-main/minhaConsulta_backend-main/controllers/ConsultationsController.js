const db = require('../db/database');

exports.getConsultations = (req, res) => {
  db.all('SELECT * FROM consultations', [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar consultas:', err.message); // Log do erro
      return res.status(500).json({ error: 'Erro ao buscar consultas.' });
    }
    res.json(rows);
  });
};

exports.createConsultation = (req, res) => {
  const { vehicleLocation, weight, incidentType, vehicleBrand } = req.body; // Campos de entrada

  // Validação dos dados recebidos
  if (!vehicleLocation || !weight || !incidentType || !vehicleBrand) {
    return res.status(400).json({ error: 'Por favor, preencha todos os campos!' });
  }

  db.run(
    `INSERT INTO consultations (userId, vehicleLocation, weight, incidentType, vehicleBrand) VALUES (?, ?, ?, ?, ?)`, // Inserção no banco
    [req.body.userId, vehicleLocation, weight, incidentType, vehicleBrand],
    function (err) {
      if (err) {
        console.error('Erro ao criar consulta:', err.message); // Log do erro
        return res.status(500).json({ error: 'Erro ao criar consulta.' });
      }
      res.status(201).json({ id: this.lastID }); // Retorno do ID da nova consulta
    }
  );
};
