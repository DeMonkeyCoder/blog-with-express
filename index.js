const express = require('express')
const app = express()


var blog = require('./app/views/blog')

app.use('/blog/api', blog)
app.listen(3000)