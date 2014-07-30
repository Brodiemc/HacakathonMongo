'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var VehicleSchema = new Schema({
  VIN: {
    type: String,
    required: true,
    trim: true
  }
},
  {collection: 'vehicle'});
/**
 * Statics
 */
VehicleSchema.statics.load = function(fname, lname, hnumber, pcode, cb) {
  this.find({
    FirstName: fname,
	LastName: lname,
	HouseNumber: hnumber,
	PostCode: pcode
  }).exec(cb);
};

mongoose.model('Vehicle', VehicleSchema);
