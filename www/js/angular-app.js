angular.module("app",['ionic', 'templates'])
.run(function ($ionicPlatform, $rootScope, $state) {
	$ionicPlatform.ready(function() {
	    if(window.cordova && window.cordova.plugins.Keyboard) {
	      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	      // for form inputs)
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

	      // Don't remove this line unless you know what you are doing. It stops the viewport
	      // from snapping when text inputs are focused. Ionic handles this internally for
	      // a much nicer keyboard experience.
	      cordova.plugins.Keyboard.disableScroll(true);
	    }
	    if(window.StatusBar) {
	      StatusBar.styleDefault();
	    }
  	});
	$rootScope.$state = $state;
});

angular.module('app')
.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", "$ionicConfigProvider", "$compileProvider",
  function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, $compileProvider) {
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  $httpProvider.interceptors.push('HttpRequestInterceptor');

  $urlRouterProvider.otherwise('/home');

  $stateProvider.state('app', {
    url: '',
    views: {
      "mainPanel" : {
        templateUrl: 'templates/mainPanel.html',
        controller: 'MainPanelMenuController'
      }
    }
  })

  $stateProvider.state('app.home', {
    url: '/home',
    views: {
      "home": {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      }
    }
  })

  $stateProvider.state('app.help', {
    url: '/help',
    views: {
      "help": {
        templateUrl: 'templates/help.html',
        controller: 'HelpController'
      }
    }
  })

}]);

angular.module('app')
.controller("AppController", ["$scope", "$state", "$rootScope", function ($scope, $state, $rootScope) {
  var currentState = $state.current.url;
  console.log(currentState);
}]);

angular.module('app')
.controller("HelpController", ["$scope", "$state", "$rootScope", function ($scope, $state, $rootScope) {
  $scope.data = "Help Data";
}]);

angular.module('app')
.controller("HomeController", ["$scope", "$state", "$rootScope", function ($scope, $state, $rootScope) {
  $scope.data = "Home Data"
}]);

angular.module('app')
.controller("MainPanelMenuController", ["$scope", "$state", "$rootScope", function ($scope, $state, $rootScope) {
  $scope.title = "My Trip"
}]);



angular.module('app')
.factory('HttpRequestInterceptor', ["$q", function($q){
  return {
    // optional method
    'request': function(config) {
      // do something on success
      return config;
    },

    // optional method
   'requestError': function(rejection) {
      // do something on error
      // if (canRecover(rejection)) {
      //   return responseOrNewPromise
      // }
      return $q.reject(rejection);
    },



    // optional method
    'response': function(response) {
      // do something on success
      return response;
    },

    // optional method
   'responseError': function(rejection) {
      // do something on error
      // if (canRecover(rejection)) {
      //   return responseOrNewPromise
      // }
      return $q.reject(rejection);
    }
  };
}]);
