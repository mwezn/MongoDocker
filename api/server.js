const express = require('express');
const cors = require('cors');
const User= require('./models/user')

const server = express();
server.use(cors());
server.use(express.json());

const userRoutes = require('./controllers/users.js');
const todoRoutes = require('./controllers/todos.js')
server.use(userRoutes)
server.use(todoRoutes)

setInterval(()=>User.updateEach(), 10000)


module.exports = server
