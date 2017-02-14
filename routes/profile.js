var express = require('express');
var router = express.Router();
var checkLogin = require('../middleware/check').checkLogin;

router.get('/homepage/:userid', checkLogin, function(req, res) {
  res.render('homepage', {title: '个人主页'});
});

router.get('/user/settings', checkLogin, function(req, res) {
  res.render('settings', {title: '设置'});
});

// router.post('/user/upload', fileupload.dataInput);

module.exports = router;
