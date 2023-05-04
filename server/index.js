const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const dotenv = require('dotenv');
const routes = require('./routes');
const configServer = require('./config/socket');

dotenv.config();

const { app, server, io } = configServer();

app.use(express.static('public'));
//to using req.body
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//to comunicate with front-end
app.use(
    cors({
        origin: 'http://localhost:3000',
    }),
);

//connect to database
db.connnect();

io.on('connection', (socket) => {
    console.log('a user connected ', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected ', socket.id);
    });

    socket.on('newComment', (comment) => {
        io.emit('newComment', comment);
    });

    socket.on('newReply', (reply) => {
        console.log(reply);
        io.emit('newReply', reply);
    });
});

const PORT = 5001;

routes(app);

server.listen(PORT, () => {
    console.log(`Server running`);
});
