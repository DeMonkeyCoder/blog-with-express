var express = require('express')
var router = express.Router()

// define the home page route
router.get('/', function (req, res) {
    res.json({ message: 'this is just a test!' }); 
})

module.exports = router