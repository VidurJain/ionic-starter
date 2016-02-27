angular.module('app')
.controller("HomeController", ["$scope", "$state", "$rootScope", function ($scope, $state, $rootScope) {
  $scope.data = "Home Data"
}]);
