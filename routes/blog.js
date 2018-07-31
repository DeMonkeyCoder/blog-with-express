var express = require('express')
var router = express.Router()
//TODO: var {Content, User} = require('../models/index');
//var User = require('../models/User');
var Content = require('../models/Content');
var authFuncs = require('../libs/auth');

router.route('/')

    .post(function(req, res) {
        authFuncs.verifyJWTToken(req.body.token).then((decodedToken) =>
        {
            var content = new Content(); 
            content.title = req.body.title;
            content.body = req.body.body;
            content.user = decodedToken.data._doc._id;
            content.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'post created!' });
            });
        })
        .catch((err) =>
        {
            console.log(err)
            res.status(401)
                .json({
                message: err || "Token Validation failed."
                })
        })

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