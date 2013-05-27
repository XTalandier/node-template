var router = module.exports = function(app){
  var routes = [
    'Public',
    'Authenticated'
  ];
  routes.forEach(function(route) {
    module.exports[route] = require('./' + route)(app);
  });
}

