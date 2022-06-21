const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const userRoutes = require('./controllers/users.js');
const todoRoutes = require('./controllers/todos.js')
server.use(userRoutes)
server.use(todoRoutes)


module.exports = server
