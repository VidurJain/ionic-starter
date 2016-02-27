angular.module('app')
.controller("AppController", ["$scope", "$state", "$rootScope", function ($scope, $state, $rootScope) {
  var currentState = $state.current.url;
  console.log(currentState);
}]);
