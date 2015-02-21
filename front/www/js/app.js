(function(){

    var url = "http://localhost:8080/";

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
            .state('event-host', {
                url: '/host',
                templateUrl: 'host.html'
            })
            .state('dj', {
                url: '/dj',
                templateUrl: 'dj.html'
            })
            .state('event_host_viewEvents',{
                url:'/viewEvents',
                templateUrl: 'event_host_viewEvents.html'
            })
            .state('viewCurEvent', {
                url: '/viewCurEvent',
                templateUrl: 'guest_currentEvent.html'
            })
            .state('viewLikes', {
                url: '/viewLikes',
                templateUrl: 'user_likes_view.html'
            });
        $urlRouterProvider.when('', '/#');
    });

    app.filter('alternate', function () {
        return function (items, isEven) {
            var filtered = [];
            for (var i = 0; i < items.length; i++) {
                if (isEven ^ (i % 2 != 0)) {
                    filtered.push(items[i]);
                }
            }
            return filtered;
        };
    });

    var myEvent = {
        name: "Macathon Kagin",
        location: "1600 Grand Ave",
        filter: "90's Rap",
        userCount: 18
    };

    app.controller('CreateController', function($scope, $ionicPopover, $state, $http) {
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
            $http.post(url + 'postEvent', $scope.event).success(function(data) {
                myEvent = data;
                if ($scope.event.useDJ) {
                  $state.go('dj');
                } else {
                  $state.go('event-host');
                }
            });
        };

    });

    app.controller('HostController', function($scope, $http) {
        $scope.event = myEvent;

        $scope.nowPlaying = {};
        $scope.upNext = {};

        $http.get(url + 'displayCurrentEvent').success(function(data) {
            $scope.nowPlaying = data.currentSong;
            $scope.upNext = data.nextSong;
        });

    });

    app.controller('DjController', function($scope, $ionicPopup, $http) {
        $scope.event = myEvent;
        $scope.event.userCount = 0;
        $scope.nowPlaying = {};
        $scope.upNext = {};
        $scope.pool = [];

        $http.get(url + 'displayCurrentEvent').success(function(data) {
            $scope.nowPlaying = data.currentSong;
            $scope.upNext = data.nextSong;
        });

        $http.get(url + 'getPoolOfSongs').success(function(data) {
            $scope.pool = data.songs;
        });

        $scope.popupSong = function(song) {
            $scope.selectSong = song;
            $ionicPopup.confirm({
                scope: $scope,
                title: 'Select Song',
                templateUrl: 'popup-song.html'
            }).then(function(resp) {
                if (resp) {
                    // confirm
                } else {
                    // nothing really
                }
            });
        };
    });

    var curEvent;

    app.controller('BrowseController', function($scope, $state, $http){
        $http.get(url + 'getEvents').success(function(data) {
            $scope.eventsData = data;
        });

        $scope.goEvent = function(event) {
            curEvent = event;
            $state.go("viewCurEvent");
        }
    });

    app.controller('GuestController', function($scope, $http){
        $scope.event = curEvent;
        $scope.nowPlaying = {};

        $http.get(url + 'displayCurrentEvent').success(function(data) {
            $scope.nowPlaying = data.currentSong;
        });

    });

    app.controller('LikesController', function($scope, $http) {
        $http.get(url + 'getUserLikes').success(function(data){
            $scope.userLikes = data.userLikes;
        });
    });

})();

