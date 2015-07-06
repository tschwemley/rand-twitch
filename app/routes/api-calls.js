// Dependencies
var express = require('express');
var request = require('request');
var fs = require('fs');
var router = express.Router();

// Local variables
var apiBaseUri = 'https://api.twitch.tv/kraken/';

router.get('/games', function(req, res, next) {
  request(apiBaseUri + 'games/top?limit=100', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var gamesJson = JSON.parse(body);
        res.send(gamesJson['top']);
    }
  });
});

router.post('/streams', function(req, res, next) {
    var uri = apiBaseUri + 'streams?game=' + encodeURIComponent(req.body.category) + '&limit=100';

    request(uri, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var streamsJson = JSON.parse(body).streams,
                stream = streamsJson[getRandomNumber(0, streamsJson.length)];
            
            res.send(stream);
        }  else {
            res.send('error.'); 
        }
    });
});

module.exports = router;

/** Get random number in range */
function getRandomNumber(min, max) {
    return Math.floor((Math.random() * max)) + min;
}
