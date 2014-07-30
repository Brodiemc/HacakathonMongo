'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Driver = mongoose.model('Driver');



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
