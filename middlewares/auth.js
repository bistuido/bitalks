var express = require('express');
var routerApi = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');

routerApi.use(function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, config.secret, function(err, decoded){
      if(err){
        return res.json({ success: false, message: 'Failed to authenticate token.' }); 
      }else{
        req.decoded = decoded;
        console.log(decoded._doc.admin);    
        next();
      }
    });
  }else{
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
});

module.exports = routerApi;
