'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var authService = require('../../auth/auth.service');
var User = require('./user.model');
var errorHandler = require('../../error/error.handling');

exports.create = function (req, res) {
  User.create(req.body, function (err, user) {
    if (err) { errorHandler.handle(res, err, 500); }
    res.status(201).json({
      user: _.omit(user.toObject(), ['passwordHash', 'salt']),
      token: authService.signToken(user._id)
    });
  });
};

exports.getMe = function (req, res) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -passwordHash', function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.json(401); }
    res.status(200).json(user);
  });
};
