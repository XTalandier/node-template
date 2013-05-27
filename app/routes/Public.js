var User = require('../models').User
  , crypto = require('crypto');

var Public = module.exports = function(app){
  app.get('/public' , function(req , res){
    res.send('index');
  });

  app.get('/public/user' , function(req , res){
    res.render('public/user');
  });

  app.post('/public/user' , function(req , res){
    User.find(
        {
          where : 'nickname = "' + req.param('txtnickname') + '" OR email = "' + req.param('txtemail') + '"'
        })
      .success(function(u){
        if(u == null){
          User.create({
            nickname : req.param('txtnickname') ,
            email    : req.param('txtemail')    ,
            passwd   : md5(req.param('txtpasswd'))
          }).success(function(user){
            res.send('user-created');
          });
        }else{
          res.send('user-exists');
        }
      });
  });

  app.get('/public/login' , function(req , res){
    res.render('public/login');
  });

};

var md5 = function(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}
