'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8003;

var morgan = require('morgan');
var bodyParser = require('body-parser');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());

// var greet = require('./greet');
// app.use(greet);

var guests = require('./routes/guests');

app.use(guests);
//
// var activities = require('./routers/activities');
// var drinks = require('./routes/drinks');
// var foods = require('./routes/foods');
// var guests = require('./routes/guests');
// var prizes = require('./routes/prizes');
// //
// app.use(activities);
// app.use(drinks);
// app.use(foods);
// app.use(guests);
// app.use(prizes);

app.use(function(req, res){
  res.sendStatus(404);
})
// app.use(require('./greet'));

app.listen(port, function(){
  console.log('listening on port', port);
});
