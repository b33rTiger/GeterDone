'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Board = require('./board.model');
var User = require('../user/user.model');
var List = require('../list/list.model');
var Todo = require('../todo/todo.model');
var errorHandler = require('../../error/error.handling');

exports.showBoards = function (req, res) {
  var loggedUserId = req.user._id;
  User.findOne({ _id: loggedUserId})
    .populate('_boards')
    .exec(function (error, foundUser) {
      if (error) {
        errorHandler.handle(res, error, 404);
      } else if (foundUser) {
        res.json(foundUser._boards);
      }
    });
}

exports.create = function (req, res) {
  var owner = req.user._id;
  var board = new Board ({
    name: req.body.name,
    description: req.body.description,
    _owner: owner
  });

  board.save(function (error, data) {
    if (data) {
      User.findOne({_id: owner}, function (error, owner) {
        if (error) {
          errorHandler.handle(res, error, 404);
        } else {
          var id = mongoose.Types.ObjectId(owner._id);
          owner._boards.push(data._id);
          owner.save();
          res.json(data);
        }
      });
    } else if (error) {
      errorHandler.handle(res, error, 500);
    }
  });
}

exports.showBoard = function (req, res) {
  var loggedUserId = req.user._id.toString();
  var boardOwnerId;
  var boardLists = [];

  if (mongoose.Types.ObjectId.isValid(req.params.board_id)) {
    Board.findOne({_id: req.params.board_id})
    .populate('lists')
    .exec(function (error, board) {
    boardOwnerId = board._owner.toString()
    })
  }

}