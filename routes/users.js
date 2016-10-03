var express = require('express');
var User = require('../models/user.js');
var router = express.Router();
var User = require('../models/user');

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

router.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User({ 
    name: 'Nick Cerminara', 
    password: '12345',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});   


module.exports = router;
