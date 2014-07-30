'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Driver = mongoose.model('Driver'),
  Vehicle = mongoose.model('Vehicle');



/**
 * List of Articles
 */
exports.all = function(req, res) {
  Driver.find().sort('-created').exec(function(err, drivers) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the articles'
      });
    }
    res.json(drivers);

  });
};

/**
 * Find article by id
 */
exports.driver = function(req, res) {
  Driver.load(req.params.driverId, function(err, driver) {
	  
	  //match to vehicles.
	  console.log(driver.FirstName);
	  console.log(driver.LastName);
	  console.log(driver.HouseNumber);
	  console.log(driver.PostCode);
	  
	  var fname = driver.FirstName;
	  var lname = driver.LastName;
	  var hname = driver.HouseNumber;
	  var pcode = driver.PostCode;
	  
	
	Vehicle.load(fname, lname, hname, pcode, function(err, vehicle) {
		
		res.json({driver: driver, vehicle: vehicle});
		console.log(vehicle);
	});
	console.log(driver);
  });
};


/**
 * Show an article
 */
exports.show = function(req, res) {
  res.json(req.driver);
};