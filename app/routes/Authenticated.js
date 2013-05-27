var auth = require('../modules/authentication');

var Authenticated = module.exports = function(app){
  app.get('/authenticated' , function(req , res){
    checkAuth(req , res , function(){
      res.send('authenticated');
    });
  });

  app.get('/authenticated/account' , function(req , res){
    checkAuth(req , res , function(){
      res.send('authenticated/account');
    });
  });
  app.get('/authenticated/publish' , function(req , res){
    checkAuth(req , res , function(){
      res.send('authenticated/publish');
    });
  });
};

var checkAuth = function(req , res , callback){
  auth.autoLogin(req.param('token') , function(user){
    if(user) callback();
    res.send('bad-token');
  });
};

