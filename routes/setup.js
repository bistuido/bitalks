var express = require('express');
var User = require('../models/user.js');
var router = express.Router();

router.get('/', function(req, res) {
  User.create({ 
    name: 'Nick Cerminara', 
    password: 'password',
    admin: true 
  }, function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;
