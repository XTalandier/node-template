var crypto = require('crypto');
var User = require('../models').User;

exports.manualLogin = function(email, passwd, callback) {
  User.find({
    where: {
      email  : email,
      passwd : md5(passwd)
    }
  })
  .success(function(o) {
      if (o == null){
      callback('user-not-found');
    } else{
      validatePassword(passwd, o.passwd, function(err, res) {
        if (res){
          var token = new Date();
          o.token = md5(token.toString());
          o.save().success(function(){
            callback(null, o);
          });
        } else{
          callback('invalid-password');
        }
      });
    }
  });
};

exports.autoLogin = function(token, callback) {
  User.find({
    where: {
      token : token
    }
  })
  .success(function(o) {
    if (o){
      callback(o);
    } else{
      callback(null);
    }
  });
};



var validatePassword = function(plainPass, hashedPass, callback) {
  var validHash = md5(plainPass);
  callback(null, hashedPass === validHash);
}

var md5 = function(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}
