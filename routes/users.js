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

router.get('/:id', function(req, res, next) {
  User.findById( req.params.id, function(err, user){
    if(err) return next(err);
    res.json(user);
  });
});

router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate( req.params.id, req.body, function(err, user){
    if(err) return next(err);
    res.json(user);
  });
});

router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, function(err, user){
    if(err) return next(err);
    res.json(user);
  });
});

module.exports = router;
