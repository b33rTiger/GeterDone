'use strict';

andgular.module('geterDone')
  .service('ListService', function ($rootScope, $q, $http) {
    var service = {};

    service.showLists = function () {
      var deferred = $q.defer();
      $http.get('/api/list')
        .success(function (returnedLists) {
          deferred.resolve(returnedLists);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
      return deferred.promise;
    }

    service.createList = function (formData) {
      var deferred = $q.defer();
      $http.post('/api/list/create', formData)
        .success(function (data) {
          formData = {};
          deferred.resolve(data);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
      return deferred.promise;
    }

    service.updateList = function (id, formData) {
      var deferred = $q.defer();
      $http.post('/api/list/update/' + id, formData)
        .sucess(function (updatedList) {
          deferred.resolve(updatedList);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        })
      return deferred.promise;
    }

    service.deleteList = function (id) {
      var deferred = $q.defer();
      $http.post('/api/list/delete/' + id)
        .success(function (deletedList) {
          deferred.resolve(deletedList);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
      return deferred.promise;
    }

  })