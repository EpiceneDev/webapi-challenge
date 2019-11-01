const express = require('express');
const helmet = require('helmet');
const projectRouter = require('./middleware/projectRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/data/helpers', projectRouter);

server.get('/', (req, res) => {
    res.send(`<h1>WEB API SPRINT</h1>`)
});

module.exports = server;