const express = require('express');
const router = express.Router();

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Contato recebido: ${name}, ${email}, ${message}`);
  res.json({ message: 'Mensagem recebida com sucesso!' });
});

module.exports = router;
