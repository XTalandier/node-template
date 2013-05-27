var server = require('../../server')
  , zombie = require('zombie');

var page = exports.page = function(path){ 
 return "http://localhost:" + server.app.get('config').port + path
};

exports.visit = function(path, callback){
  zombie.visit(page(path), function(err, browser){
    callback(err, browser, browser.statusCode);
  });
};