const express = require('express');
const http = require('http');
const path = require('path');
const ws = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

app.use(express.static(path.join(__dirname, '../Public')));
app.use(express.json());

// AJAX Route
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Recebido: ${name}, ${email}, ${message}`);
  res.json({ message: 'Mensagem recebida com sucesso!' });
});

// WebSocket
wss.on('connection', (socket) => {
  socket.on('message', (msg) => {
    wss.clients.forEach(client => {
      if (client.readyState === ws.OPEN) client.send(msg);
    });
  });
});

server.listen(3000, () => {
  console.log('Servidor ativo em http://localhost:3000');
});
