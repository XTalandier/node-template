var helper = require('./testHelper')
  , User = require('../../app/models/').User;

describe("Users", function(){
  /**
   * Test created user
   */
  describe("#create user", function(){
    it("is created", function(done){
      helper.visit('/public/user', function(err, browser, status){
        if(err) done(err);
        browser
          .fill('txtnickname' , 'a-user')
          .fill('txtemail'    , 'a-user@example.com')
          .fill('txtpasswd'   , 'mypasswor')
          .pressButton('Sign up' , function(){
            User.find({
              where : {email : 'a-user@example.com' , nickname : 'a-user'}
            }).success(function(o){
              var condition = browser.body.innerHTML == 'user-created' && o !== null;
              condition.should.equal(true);
              done();
            });
          });
      });
    });
    it("is not created", function(done){
      helper.visit('/public/user', function(err, browser, status){
        if(err) done(err);
        browser
          .fill('txtnickname' , 'a-user')
          .fill('txtemail'    , 'a-user@example.com')
          .fill('txtpasswd'   , 'mypasswor')
          .pressButton('Sign up' , function(){
            browser.body.innerHTML.should.equal('user-exists');
            done();
          });
      });
    });
  });
});