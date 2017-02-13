var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middleware/check').checkNotLogin;
var User = require('../model/user');


router.get('/signup', checkNotLogin, function(req, res) {
  res.render('signup', {title: '注册新用户'});
});

router.post('/signup', checkNotLogin, function(req, res) {
  var _u = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  var user = new User(_u);
  user.save(function(err) {
    if (err) console.log(err);
    console.log('user saved!');
    req.flash('success', '注册成功');
    return res.redirect('/signup');
  });
});

module.exports = router;
