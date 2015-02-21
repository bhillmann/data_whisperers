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
            });
        $urlRouterProvider.when('', '/#');
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
        //$scope.nowPlaying = {
        //    title: "Blank Space",
        //    artist: "Taylor Swift",
        //    img: "img/Blank_Space.png"
        //};
        //$scope.upNext = {
        //    title: "Uptown Funk",
        //    artist: "Mark Ronson",
        //    img: "img/Uptown_Funk.png"
        //};

        $http.get(url + 'displayCurrentEvent').success(function(data) {
            $scope.nowPlaying = data.currentSong;
            $scope.upNext = data.nextSong;
        });

    });

    app.controller('DjController', function($scope, $ionicPopup) {
        $scope.event = myEvent;
        $scope.event.userCount = 0;
        $scope.nowPlaying = {
            title: "Blank Space",
            artist: "Taylor Swift",
            img: "img/Blank_Space.png"
        };
        $scope.upNext = {
            title: "Uptown Funk",
            artist: "Mark Ronson",
            img: "img/Uptown_Funk.png"
        };

        $scope.song = {
            title: "This is an extremely long Title",
            artist: "Rae Sremmurd"
        };

        $scope.popupSong = function(song) {
            $scope.selectSong = song;
            $ionicPopup.confirm({
                scope: $scope,
                title: 'Select Song',
                templateUrl: 'popup-song.html'
            }).then(function() {

            });
        }
    });

    var curEvent;

    app.controller('BrowseController', function($scope, $state, $http){
        $http.get(url + 'getEvents').success(function(data, status, headers, config) {
            $scope.eventsData = data;
        });

        $scope.goEvent = function(event) {
            curEvent = event;
            $state.go("viewCurEvent");
        }
    });

    app.controller('GuestController', function($scope){
        $scope.event = curEvent;
    });

    app.controller('PrefController', function($scope, $http) {

        $scope.test = function() {
            $http.get(url + 'getUserLikes').success(function(data, status, headers, config) {
                $scope.httpData = data;
            });
        };
    });

})();

