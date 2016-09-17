var express = require('express');
var User = require('../models/user.js');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');

router.post('/login', function (req, res, next) {
  User.findOne({
    name: req.body.name,
    password: req.body.password
  }, function (error, user) {
    if (error) return next(err);
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found or wrong password' });
    }
    else {
      var token = jwt.sign(user, config.secret, {
        expiresIn: "1 day" // expires in 1day
      });

      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    };
  });
});

router.post('/register', function (req, res, next) {
  User.findOne({
    name: req.body.name
  }, function (err, user) {
    if (user) {
      res.status(409).send({ success: false, message: 'Conflict.' });
    }
    else {
      if (!req.body.password || req.body.password.length == 0 ) {
        return res.status(406).send({ success: false, message: 'Not acceptable.' });
      }
      User.create(req.body, function (err, user) {
        if (err) return next(err);
        res.json(user);
      });
    };
  });
});

module.exports = router;
