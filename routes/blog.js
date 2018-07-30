var express = require('express')
var router = express.Router()
//TODO: var {Content, User} = require('../models/index');
//var User = require('../models/User');
var Content = require('../models/Content');

router.route('/')

    .post(function(req, res) {

        var content = new Content();      
        console.log(req.body);
        content.title = req.body.title;
        content.body = req.body.body;

        // save the bear and check for errors
        content.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'post created!' });
        });

    })

    .get(function (req, res) {
        Content.find(function(err, posts) {
            if (err)
                res.send(err);
            res.json(posts);
        });
    });


router.route('/:content_id')

    .get(function(req, res) {
        Content.findById(req.params.content_id, function(err, content) {
            if (err)
                res.send(err);
            res.json(content);
        });
    })

    .put(function(req, res) {

        // use our bear model to find the bear we want
        Content.findById(req.params.content_id, function(err, content) {

            if (err)
                res.send(err);

            content.title = req.body.title;
            content.body = req.body.body;

            content.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Post updated!' });
            });

        });
    })


    .delete(function(req, res) {
        Content.remove({
            _id: req.params.content_id
        }, function(err, content) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router