'use strict';

var express = require('express');
var router = express.Router();

router.get('/english', function(req, res){
  res.send('Hell world');
});

router.get('/spanish', function(req, res){
  res.send('Halo mundo');
});

module.exports = router;
