var express = require('express')
var router = express.Router()
var User = require('../models/User');
var authFuncs = require('../libs/auth');

router.route('/list')
  .get(function (req, res) {
      User.find(function(err, users) {
          if (err)
              res.send(err);
          res.json(users);
      });
  });
  
  
router.route('/signup')

  .post(function(req, res) {

      var user = new User();      
      console.log(req.body);
      user.username = req.body.username;
      user.email = req.body.email;
      user.setPassword(req.body.password);
      user.save(function(err) {
          if (err)
              res.send(err);

          res.json({ message: 'user created!' });
      });

  });
  
router.route('/login')

  .post(function(req, res) {
      User.findOne({ 'username': req.body.username })
        .then((user) => (!user) ? Promise.reject("User not found.") : user)
        .then((user) => user.validPassword(req.body.password))
        //.then((user) => user.publicParse(user))
        .then((user) =>
        {
        res.status(200)
            .json({
            success: true,
            token: authFuncs.createJWToken({
                sessionData: user,
                maxAge: 3600
                })
            })
        })
        .catch((err) =>
        {
            console.log(err)
            res.status(401)
                .json({
                message: err || "Validation failed. Given email and password aren't matching."
                })
        })

  });

module.exports = router