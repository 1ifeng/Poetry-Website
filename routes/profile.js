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

// 上传头像
router.post('/upload', upload.single('avatar'), function (req, res, next) {
  if (req.file) {
    var userid = req.session.user._id;
    var avatarPath = (req.file.path).replace(/\\/g, '/').slice(4);
    User.update({_id: userid}, {avatarUrl: avatarPath}, function(err, user) {
      if(err) console.log(err);
      console.log('UPDATE OK');
    });
    req.session.user.avatarUrl = avatarPath;
    req.session.save();
    res.redirect('/user/settings');
  } else {
    req.flash('info', '请选择一张图片');
    return res.redirect('/user/settings');
  }
});

// 修改密码
router.post('/changePassword', function(req, res, next) {
  var currentPassword = req.body.currentPassword;
  var newPassword = req.body.newPassword;
  var userid = req.session.user._id;
  User.findOne({_id: userid}, function(err, user) {
    if (err) console.log(err);
    if (user.password !== currentPassword) {
      req.flash('error', '当前密码错误');
      return res.redirect('/user/settings');
    } else {
      User.update({_id: userid}, {password: newPassword}, function(err, result) {
        if(err) console.log(err);
        console.log('change user\'s password successful!');
      });
      req.flash('success', '修改成功');
      return res.redirect('/user/settings');
    }
  });
});

module.exports = router;
