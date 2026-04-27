// Importa o framework Express
const express = require('express');
const app = express();

// Importa o Mongoose
const mongoose = require('mongoose');

// 🔐 COLOQUE SUA URL AQUI
const mongoURL = "mongodb+srv://kauehsd:292721@cluster0.nptuecd.mongodb.net/tarefas";
// Middleware CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE');
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Middleware JSON
app.use(express.json());

// Porta
const PORT = process.env.PORT || 3000;

// Rotas
const routes = require('./routes/routes');
app.use('/api', routes);

// Conexão com MongoDB
mongoose.connect(mongoURL)
    .then(() => {
        console.log('Database Connected');

        // Só inicia o servidor depois de conectar
        app.listen(PORT, () => {
            console.log(`Server Started at ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });