'use strict';

angular.module('geterDone')
  .controller('SignupCtrl', ['$location', 'Auth', 'ErrorService', function ($location, Auth, ErrorService) {

    var vm = this;

    angular.extend(vm, {

      name: 'SignupCtrl',

      signup: function () {
        Auth.signup(vm.user)
          .then(function () {
            $location.path('/board');
          })
          .catch(function (err) {
            $location.path('/signup');
            ErrorService.errorToasty(err);
          });
      }

    });

  }]);
