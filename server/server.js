const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { dbConnection } = require('./database/config');
const chatSocket = require('./controllers/chat'); //* Importa la lógica de chat


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    },
    transports: ["websocket"]
});


//* Middlewares
app.use(express.json());
app.use(cors());


//* MongoDB Connection
dbConnection();

//* Socket.io connection
chatSocket(io); //* Ejecuta la lógica con el objeto `io`


//* Rutas
app.use('/api/auth', require('./routes/auth'));



//* Server listening
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});






