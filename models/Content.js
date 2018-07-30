var mongoose     = require('mongoose');

const ContentSchema = new mongoose.Schema({
    title: { type : String, required: [true, "can't be blank"], null: true, trim : true, index: true},
    body: { type : String, required: [true, "can't be blank"], trim : true },
    //user: { type : Schema.ObjectId, ref : 'User' },
    createdAt  : { type : Date, default : Date.now },
    /*comments: [{
        body: { type : String, required: [true, "can't be blank"] },
        //user: { type : Schema.ObjectId, ref : 'User' },
        createdAt: { type : Date, default : Date.now }
    }]*/
  });
  
module.exports = mongoose.model('Content', ContentSchema);
