const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();
const logger = require('./middleware/logger.js');
const projectRouter = require('./middleware/projectRouter.js');
const actionRouter = require('./middleware/actionRouter.js');



server.use(helmet());
server.use(express.json());
server.use(logger);
server.use(morgan("server"));
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


server.get('/', (req, res) => {
    res.send(`<h1>WEB API SPRINT</h1>`)
});

module.exports = server;