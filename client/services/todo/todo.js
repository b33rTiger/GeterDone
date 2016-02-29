'use strict';

andgular.module('geterDone')
  .service('TodoService', function ($rootScope, $q, $http) {
    var service = {};

    service.showTodos = function () {
      var deferred = $q.defer();
      $http.get('/api/todo')
        .success(function (returnedTodos) {
          deferred.resolve(returnedTodos);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
      return deferred.promise;
    }

    service.createTodo = function (formData) {
      var deferred = $q.defer();
      $http.post('/api/todo/create', formData)
        .success(function (data) {
          formData = {};
          deferred.resolve(data);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
      return deferred.promise;
    }

    service.updateTodo = function (id, formData) {
      var deferred = $q.defer();
      $http.post('/api/todo/update/' + id, formData)
        .sucess(function (updatedTodo) {
          deferred.resolve(updatedTodo);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        })
      return deferred.promise;
    }

    service.deleteTodo = function (id) {
      var deferred = $q.defer();
      $http.post('/api/todo/delete/' + id)
        .success(function (deletedTodo) {
          deferred.resolve(deletedTodo);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
      return deferred.promise;
    }

  })