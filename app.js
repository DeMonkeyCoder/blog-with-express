const express = require('express');
const app = express();
const mongoose   = require('mongoose');
var bodyParser = require('body-parser');


/*
async function x(a){
   return a + 5;
}
x(3).then((k) => console.log(k));
x(5).then((k) => k + 5).then((p) => console.log(p));
*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/testblog'); // connect to our database

var blog = require('./routes/blog');
app.use('/blog/api/posts', blog);
var auth = require('./routes/auth');
app.use('/blog/api/auth', auth);



app.listen(3000)