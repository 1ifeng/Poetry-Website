var express = require('express');
var router = express.Router();
var checkLogin = require('../middleware/check').checkLogin;
var upload = require('../middleware/upload');
var User = require('../model/user');

router.get('/homepage/:userid', checkLogin, function(req, res) {
  var arr = req.path.split('/homepage/');
  var userid = arr[1];
  User.findOne({'_id': userid}, function(err, guest) {
    if(err) console.log(err);
    res.render('homepage', {
      title: '个人主页',
      guest: guest
    });
  });

});

router.get('/user/settings', checkLogin, function(req, res) {
  res.render('settings', {title: '设置'});
});

router.post('/upload', upload.single('avatar'), function (req, res, next) {
  var userid = req.session.user._id;
  var avatarPath = (req.file.path).replace(/\\/g, '/').slice(4);
  User.update({_id: userid}, {avatarUrl: avatarPath}, function(err, user) {
    if(err) console.log(err);
    console.log('UPDATE OK');
  });
  req.session.user.avatarUrl = avatarPath;
  req.session.save();
  res.redirect('/user/settings');
});

module.exports = router;
