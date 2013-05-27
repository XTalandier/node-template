/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./routes')
  , assets  = require('connect-assets')
  , _       = require('underscore')._
  , http    = require('http')
  ;

var app = module.exports = express();

app.run = function(config){
  var config = _.extend({
      port: 3000
    , home: __dirname 
    , logger: console
  }, config);

  app.set('config' , config);
  // Configuration
  app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html')
    app.set('layout', 'layouts/index');
    //app.enable('view cache');
    app.engine('html', require('hogan-express'));

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    //app.use(assets({src: config.home + "/assets"}));
    app.use(express.static(__dirname + '/public'));
  });

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  });

  app.configure('production', function(){
    app.use(express.errorHandler()); 
  });

  routes(app);

  // Listen
  http.createServer(app).listen(config.port, function(){
    config.logger.http("Express server listening on port " + config.port + " in " + app.settings.env + " mode");
  });

  return app;
};