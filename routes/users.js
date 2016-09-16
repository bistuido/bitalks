var express = require('express');
var User = require('../models/user.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, users){
    if(err) return next(err);
    res.json(users);
  });
});

router.get('/setup', function(req, res) {
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
