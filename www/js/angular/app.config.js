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

// add any other state with defaultView as its view which does not belong to tabs
}]);
