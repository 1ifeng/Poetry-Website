var express = require('express');
var router = express.Router();
var checkLogin = require('../middleware/check').checkLogin;
var Poetry = require('../model/poetry');

router.get('/release', checkLogin, function(req, res) {
  res.render('release', {title: '发布新'});
});

router.post('/release', checkLogin, function(req, res) {
  var _p = {
    userid: req.session.user._id,
    username: req.session.user.username,
    firstline: req.body.firstline,
    secondline: req.body.secondline,
    thirdline: req.body.thirdline
  };

  var poetry = new Poetry(_p);
  poetry.save(function(err) {
    if (err) console.log(err);
    console.log('saved!!!!');
    res.redirect('index');
  });

});

module.exports = router;
