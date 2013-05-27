var helper = require('./testHelper');

describe("routes", function(){
  /**
   * Test publics routes
   */
  describe("#public", function(){
    it("is served", function(done){
      helper.visit('/public', function(err, browser, status){
        if(err) done(err);
        status.should.equal(200);
        done();
      });
    });
    it("should be served at /public/user", function(done){
      helper.visit('/public/user', function(err, browser, status){
        if(err) done(err);
        status.should.equal(200);
        done();
      });
    });
    it("should be served at /public/login", function(done){
      helper.visit('/public/login', function(err, browser, status){
        if(err) done(err);
        status.should.equal(200);
        done();
      });
    });
  });
  describe("#authenticated", function(){
    it("is served", function(done){
      helper.visit('/authenticated', function(err, browser, status){
        if(err) done(err);
        status.should.equal(200);
        done();
      });
    });
    it("should be served at /authenticated/account", function(done){
      helper.visit('/authenticated/account', function(err, browser, status){
        if(err) done(err);
        status.should.equal(200);
        done();
      });
    });
  });
});