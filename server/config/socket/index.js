const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const configServer = () => {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);

    return {
        app,
        server,
        io,
    };
};

module.exports = configServer;
