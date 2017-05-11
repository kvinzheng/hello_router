'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, '../guests.json');

var express = require('express');
// var app = express();
var router = express.Router();

router.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var guests = JSON.parse(guestsJSON);
    // console.log('what is guest', guests);
    res.send(guests);
  });
});

router.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, newGuestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(newGuestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'text/plain');
    res.send(guests[id]);
  });
});

router.post('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var guests = JSON.parse(guestsJSON);
    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests.push(guest);

    var newGuestsJSON = JSON.stringify(guests);
    // console.log('what is newGuestsJSON', newGuestsJSON);
    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    1});
  });
});

router.put('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests[id] = guest;

    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

router.delete('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(guestsJSON);
    // console.log('what is guests here that get deleted', guests);
    if (id < 0 || id >= guests.length || Number.isNaN(id) ) {
      return res.sendStatus(404);
    }

    var guest = guests.splice(id, 1)[0];
    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

module.exports = router;
