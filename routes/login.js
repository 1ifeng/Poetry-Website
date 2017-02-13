var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middleware/check').checkNotLogin;
var User = require('../model/user');

router.get('/login', checkNotLogin, function(req, res) {
  res.render('login', {title: '登录'});
});

router.post('/login', checkNotLogin, function(req, res) {
  var email = req.body.email,
      password = req.body.password;

  User.findOne({email: email}, function(err, user) {
    if (err) console.log(err);
    if (!user) {
      req.flash('error', '该邮箱未注册');
      return res.redirect('login');
    } else {
      if (user.password !== password) {
        req.flash('error', '账号或密码错误');
        return res.redirect('login');
      } else {
        req.flash('success', '登录成功');
        delete user.password;
        req.session.user = user;
        res.redirect('index');
      }
    }
  });
});

module.exports = router;
