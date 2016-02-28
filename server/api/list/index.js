'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./list.controller');
var auth = require('../../auth/auth.service');

module.exports = router;
