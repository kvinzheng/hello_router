'use strict';

var express = require('express');
var port = process.env.PORT || 8003;
var path = require('path');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

// var greet = require('./greet');
// app.use(greet);

const artists = require('./routes/artists');
const tracks = require('./routes/tracks');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());

var guests = require('./routes/guests');

app.use(express.static(path.join('public')));

app.use(artists);
app.use(tracks);
app.use(guests);

// var greet = require('./greet');
// app.use(greet);


// var activities = require('./routers/activities');
// var drinks = require('./routes/drinks');
// var foods = require('./routes/foods');
// var guests = require('./routes/guests');
// var prizes = require('./routes/prizes');

// app.use(activities);
// app.use(drinks);
// app.use(foods);
// app.use(guests);
// app.use(prizes);

app.use(function(req, res){
  res.sendStatus(404);
})
// app.use(require('./greet'));
app.use((err, _req, res, _next) => {
  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, function(){
  console.log('listening on port', port);
});
module.exports = app;
