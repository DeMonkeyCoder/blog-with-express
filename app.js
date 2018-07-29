const express = require('express')
const app = express()
require('./app/models/user');

const mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/testblog'); // connect to our database

var blog = require('./app/views/blog')

app.use('/blog/api', blog)
app.listen(3000)