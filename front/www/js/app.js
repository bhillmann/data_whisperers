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
        });
    $urlRouterProvider.when('', '/#');
  });

  app.controller('MainController', function($scope) {

  });

  app.controller('CreateController', function($scope, $ionicPopover) {
    $scope.event = {
      filter: 'None'
    };

    $scope.filters = ["None", "Pop", "Rap", "EDM"];

    $ionicPopover.fromTemplateUrl('filter-popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.filterPopover = popover;
    });

    $scope.openFilterPopover = function($event) {
      $scope.filterPopover.show($event);
    };

    $scope.closeFilterPopover = function() {
      $scope.filterPopover.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.filterPopover.remove();
    });

    $scope.publish = function() {

    };

  });

})();

