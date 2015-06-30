var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Random Twitch',
    categories: getCategories()
  });
});

router.get('/video', function(req, res, next) {
    // Construct category JSON array
        var categories = getCategories();
        res.send(categories);
});

module.exports = router;

/** Read from categories file and return in JSON array **/
function getCategories() {
    var categoryFile = fs.readFileSync('/var/www/rand-porn/app/data/categories.json');

    return JSON.parse(categoryFile)['categories'];
}
