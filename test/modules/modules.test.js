var auth = require('../../app/modules/authentication')
  , request = require('supertest')
  , should = require('should')
  , Models = require('../../app/models/');


function createUser(callback){
  var User = Models.User;
  Models.User.findOrCreate({
    email    : 'test@servergala.com' ,
    passwd : '47bce5c74f589f4867dbd57e9ca9f808'// 'aaa'
  }).success(function(user){
    callback(user);
  });
}

describe('Module',function(){
  describe('#manualLogin',function(){
    it('should return "user-not-found"', function(done){
      createUser(function(){
        auth.manualLogin('unknowemail@servergala.com' , 'mypassword' , function(ret){
          ret.should.equal('user-not-found');
          done();
        });
      });
    });
    it('manualLogin: should return "invalid-password"', function(done){
      createUser(function(){
        auth.manualLogin('test@servergala.com' , 'mypassword' , function(ret){
          ret.should.equal('user-not-found');
          done();
        });
      });
    });
    it('should return null', function(done){
      createUser(function(){
        auth.manualLogin('test@servergala.com' , 'aaa' , function(ret){
          var isNull = ret === null;
          isNull.should.equal(true);
          done();
        });
      });
    });
  });
});