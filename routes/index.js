var express = require('express');
var router = express.Router();
var checkLogin = require('../middleware/check').checkLogin;
var Poetry = require('../model/poetry');

/* GET home page. */
router.get('/', function(req, res, next) {
  Poetry.find(function(err, poetries) {
    if (err) console.log(err);
    console.log(poetries);
    res.render('index', {
     title: 'Poetry',
     data: poetries
   });
  });
});

router.get('/index', function(req, res, next) {
  Poetry.find(function(err, poetries) {
    if (err) console.log(err);
    console.log(poetries);
    res.render('index', {
     title: 'Poetry',
     data: poetries
   });
  });
});

router.get('/logout', checkLogin, function(req, res, next) {
  req.session.user = null;
  res.redirect('index');
});

module.exports = router;
