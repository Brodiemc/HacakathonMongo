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
  }
});
/**
 * Statics
 */
DriverSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Driver', DriverSchema, 'driver');
