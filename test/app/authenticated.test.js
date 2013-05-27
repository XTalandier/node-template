var helper = require('./testHelper')
  , User = require('../../app/models/').User;

var user = null;

describe("Authenticated", function(){

  before(function(done){
    User.create({
      nickname : 'auth-user' ,
      email    : 'auth-user@example.com' ,
      passwd   : 'mypassword' ,
      token    : 'a-simple-token'
    }).success(function(user){
      done();
    });
  });


  describe("#check authentication", function(){
    it("shoud continue with a good token", function(done){
      helper.visit('/authenticated?token=a-simple-token', function(err, browser, status){
        browser.body.innerHTML.should.not.equal('bad-token');
        done();
      });
    });
  });
  describe("#check authentication", function(){
    it("should return 'bad-token' with a wrong token", function(done){
      helper.visit('/authenticated?token=a-bad-token', function(err, browser, status){
        browser.body.innerHTML.should.equal('bad-token');
        done();
      });
    });
  });
});
