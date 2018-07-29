const express = require('express');
const app = express();

const mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/testblog'); // connect to our database

var blog = require('./routes/blog');

app.use('/blog/api', blog);
app.listen(3000)