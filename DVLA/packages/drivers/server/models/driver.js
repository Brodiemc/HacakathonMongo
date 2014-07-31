'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var DriverSchema = new Schema({
  currentDriverNumber: {
    type: String,
    required: true,
    trim: true
  },
	  FirstName: {
	      type: String,
	      required: true,
	      trim: true
	  },
	  LastName: {
	      type: String,
	      required: true,
	      trim: true
	  },
  	HouseNumber: {
	      type: String,
	      required: true,
	      trim: true
	  },
    PostCode: {
  	      type: String,
  	      required: true,
  	      trim: true
  	  },
	  VINNumbers: {
  	      type: String,
  	      required: true,
  	      trim: true
	  }
},
  {collection: 'driver'});
/**
 * Statics
 */
DriverSchema.statics.load = function(id, cb) {
  this.findOne({
    currentDriverNumber: id
  }).exec(cb);
};

DriverSchema.statics.loadSurname = function(lastname, cb) {
  this.findOne({
    LastName: lastname
  }).exec(cb);
};

mongoose.model('Driver', DriverSchema);
