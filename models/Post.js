var mongoose     = require('mongoose');

var ContentSchema   = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Content', ContentSchema);
