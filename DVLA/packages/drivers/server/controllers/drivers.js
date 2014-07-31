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
	  //console.log(driver.FirstName);
	  //console.log(driver.LastName);
	  //console.log(driver.HouseNumber);
	  //console.log(driver.PostCode);
	  
	  renderData(driver, res);
	//console.log(driver);
  });
};

exports.driverLink = function(req, res) {
	
	Driver.load(req.params.driverId, function(err, driver) {
		var vinnumbers = driver.VINNumbers + ' ' + req.params.VIN;
		console.log(req.params.VIN);
		Vehicle.loadVIN(req.params.VIN, function(err, vehicle) {
			if (vehicle != null){
				console.log(vehicle.FirstName);
				console.log(driver.FirstName);
				console.log(vehicle.LastName);
				console.log(driver.LastName);
				console.log(vehicle.FirstName == driver.FirstName && vehicle.LastName == driver.LastName)
			if (vehicle.FirstName == driver.FirstName && vehicle.LastName == driver.LastName) {
				console.log('got some more');
				Driver.update(
		  	  	  {currentDriverNumber: req.params.driverId}
		 	 	 , { $set: {'VINNumbers': vinnumbers.trim()}}
		  		 , function(error, result) {
		  			 res.json("Success");
		 	   	}
				);
			}
			else {
				res.json("Failed");
			}
		}
		else {
			rres.json("Failed");
		}
		});
	});
	
};

function renderData(driver, res) {
  var fname = driver.FirstName;
  var lname = driver.LastName;
  var hname = driver.HouseNumber;
  var pcode = driver.PostCode;
  var VINNumber = driver.VINNumbers;
  
  if (VINNumber == "" || VINNumber == undefined)
  {
	  Vehicle.load(fname, lname, hname, pcode, function(err, vehicle) {

	if (vehicle != [])
		linkData(driver, vehicle);

		res.json([{driver: driver}, {vehicle: vehicle}]);
		//console.log(vehicle);
	});
}
  else {
	  var array = VINNumber.split(' ');
	  
	  getVehicles(array, function(vArray) {
		  res.json([{driver: driver}, {vehicle: vArray}]);
		  console.log('get vin numbers');
	  });
	  
	}
	
}

function getVehicles ( array, callback) {

  var i = 0;
  var vehicles = [];
  var keys = array.length;
  for (i = 0; i<array.length;) {
	  Vehicle.loadVIN(array[i], function(err, vehicle) {
		  console.log(vehicle);
	  	vehicles.push(vehicle);
		if (--keys === 0)
			callback(vehicles);
	  });
	  i = i+1;
  }
  	
}

function onComplete(vehicles, cb) {
    cb(vehicles);
};

function linkData(driver, vehicles) {
	console.log(vehicles.length);
	var i = 0;
	var VINString = '';
	for (i = 0; i<vehicles.length;) {
		console.log(vehicles[i].VIN);
		VINString = VINString + ' ' + vehicles[i].VIN;
		i = i+1;
	}
	
	console.log(driver.currentDriverNumber);
	Driver.update(
	    {currentDriverNumber: driver.currentDriverNumber}
	  , { $set: {'VINNumbers': VINString.trim()}}
	  , function(error, result) {
	      console.dir(result);
	    }
	);
}

exports.driverSearch = function(req, res) {
  Driver.loadSurname(req.params.surname, function(err, driver) {
	  
	  //match to vehicles.
	  //console.log(driver.FirstName);
	  //console.log(driver.LastName);
	  //console.log(driver.HouseNumber);
	  //console.log(driver.PostCode);
	  
	  renderData(driver, res);
	//console.log(driver);
  });
};


/**
 * Show an article
 */
exports.show = function(req, res) {
  res.json(req.driver);
};