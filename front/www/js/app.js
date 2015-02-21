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
        .state('create', {
          url: '/create',
          templateUrl: 'create.html'
        })
        .state('event_host_viewEvents',{
            url:'/viewEvents',
            templateUrl: 'event_host_viewEvents.html'
        })

        .state('viewCurEvent',{
            url:'/viewCurEvent',
            templateUrl: 'guest_currentEvent.html'
        })

    $urlRouterProvider.when('', '/#');
  });

 var curEvent;

  app.controller('curEventController', function($scope){



  });

  app.controller('MainController', function($scope, $state) {
      $scope.createEvent = [{
          eventName: "filter",
          name: "name",
          location: "location",
          desc: ""
      }];


      $scope.viewCurrentEvent = function(event){

          curEvent = event;
          $state.go("viewCurEvent")

      }
  });

})();

