const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
})
 
app.get('/', function (req, res) {
  res.send('Servidor rodando...');
});
 
const server = app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080/");
});

io = socket(server, {cors: {origin: "*"}});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("sala_conectada", (dados) => {
        socket.join(dados);
    });

    socket.on("enviar_mensagem", (dados) => {
        socket.to(dados.sala).emit("receber_mensagem", dados.conteudo);
    });
});