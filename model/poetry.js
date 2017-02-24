var mongoose = require('../lib/mongoose');

var PoetrySchema = mongoose.Schema({
  userid: String,
  username: String,
  firstline: String,
  secondline: String,
  thirdline: String,
  createtime: {type : Date, default: Date.now},
  ap_users: Array,
  appreciations: {type : Number, default: 0},
  discuss: {type : Number, default: 0},
}, {
  versionKey: false
});

var Poetry = mongoose.model('poetry', PoetrySchema);

module.exports = Poetry;
