var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Random Twitch Streams',
    categories: getCategories()
  });
});

router.get('/video', function(req, res, next) {
    // Construct category JSON array
        var categories = getCategories();
        res.send(categories);
});

module.exports = router;
