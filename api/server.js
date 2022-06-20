const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const userRoutes = require('./controllers/users.js')
server.use(userRoutes)


module.exports = server
