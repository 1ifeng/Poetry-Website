var express = require('express');
var router = express.Router();
var checkLogin = require('../middleware/check').checkLogin;
var Poetry = require('../model/poetry');
var User = require('../model/user');
var EventProxy = require('EventProxy');
var ep = EventProxy();


/* GET home page. */
router.get('/', function(req, res, next) {

  Poetry.find(function(err, data) {
    if (err) console.log(err);
    var poetries = [];

    ep.after('got_user', data.length, function(list) {

      // must have a better way.
      //
      function para(_id, userid, username,firstline,secondline,thirdline,discuss,appreciations,createtime,userAvatarUrl) {
        this._id = _id;
        this.userid = userid;
        this.username = username;
        this.firstline = firstline;
        this.secondline = secondline;
        this.thirdline = thirdline;
        this.discuss = discuss;
        this.appreciations = appreciations;
        this.createtime = createtime;
        this.userAvatarUrl = userAvatarUrl;
      }
      for(var j = 0; j < data.length; j ++) {
        // var obj = new para(data[j]._id, data[j].userid, data[j].username, data[j].firstline, data[j].secondline, data[j].thirdline, data[j].discuss, data[j].appreciations, data[j].createtime, list[j].avatarUrl );
        for (var k = 0; k < list.length; k++) {
          if (data[j].userid == list[k]._id) {
            var obj = new para(data[j]._id, data[j].userid, data[j].username, data[j].firstline, data[j].secondline, data[j].thirdline, data[j].discuss, data[j].appreciations, data[j].createtime, list[k].avatarUrl );
            poetries.push(obj);
            break;
          }
        }
      }
      console.log(poetries);
      res.render('index', {
      title: 'Poetry',
      data: poetries
      });
    });

    for (var i = 0; i < data.length; i++) {
      User.findOne({'_id': String(data[i].userid)}, function(err, user) {
        ep.emit('got_user', user);
      });
    }

    // res.render('index', {
    //  title: 'Poetry',
    //  data: data
    // });

  });
});

router.get('/index', function(req, res, next) {

  Poetry.find(function(err, data) {
    if (err) console.log(err);
    var poetries = [];

    ep.after('got_user', data.length, function(list) {
      function para(_id, userid, username,firstline,secondline,thirdline,discuss,appreciations,createtime,userAvatarUrl) {
        this._id = _id;
        this.userid = userid;
        this.username = username;
        this.firstline = firstline;
        this.secondline = secondline;
        this.thirdline = thirdline;
        this.discuss = discuss;
        this.appreciations = appreciations;
        this.createtime = createtime;
        this.userAvatarUrl = userAvatarUrl;
      }
      for(var j = 0; j < data.length; j ++) {
        for (var k = 0; k < list.length; k++) {
          if (data[j].userid == list[k]._id) {
            var obj = new para(data[j]._id, data[j].userid, data[j].username, data[j].firstline, data[j].secondline, data[j].thirdline, data[j].discuss, data[j].appreciations, data[j].createtime, list[k].avatarUrl );
            poetries.push(obj);
            break;
          }
        }
      }
      console.log(poetries);
      res.render('index', {
      title: 'Poetry',
      data: poetries
      });
    });

    for (var i = 0; i < data.length; i++) {
      User.findOne({'_id': String(data[i].userid)}, function(err, user) {
        ep.emit('got_user', user);
      });
    }
  });
});

router.get('/logout', checkLogin, function(req, res, next) {
  req.session.user = null;
  res.redirect('index');
});

module.exports = router;
