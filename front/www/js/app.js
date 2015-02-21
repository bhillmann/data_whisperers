(function(){

  var app = angular.module('whisperers', ['ionic']);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
          url: '/',
          templateUrl: 'home.html'
        })
        .state('music', {
          url: '/music',
          templateUrl: 'music.html'
        });
    $urlRouterProvider.when('', '/#');
  });

  app.controller('MainController', function($scope) {

  });

})();

