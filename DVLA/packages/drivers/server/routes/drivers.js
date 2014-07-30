'use strict';


var drivers = require('../controllers/drivers');

// The Package is past automatically as first parameter
module.exports = function(Drivers, app, auth, database) {

  app.get('/drivers/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/drivers/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/drivers/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });
  
  app.route('/drivers/get').get(drivers.all);

  app.get('/drivers/example/render', function(req, res, next) {
    Drivers.render('index', {
      package: 'drivers'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
