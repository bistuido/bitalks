var express = require('express');
var User = require('../models/user.js');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');

router.post('/login', function(req, res, next){
  User.findOne({
    name: req.body.name,
    password: req.body.password
  }, function(error, user){
    if(error) return next(err);
    if(!user){
       res.json({ success: false, message: 'Authentication failed. User not found or wrong password' });
    }else{
      var token = jwt.sign(user, config.secret, {
          expiresIn: "1 day" // expires in 1day
      });

      res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
    }
  });
});

module.exports = router;
