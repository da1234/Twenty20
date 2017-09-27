// Ionic Starter App
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starterRoutes'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
  
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.homePage', {
    url: '/homePage',
    views: {
      'tab-homePage': {
        templateUrl: 'templates/tab-homePage.html',
        controller: 'HomePageCtrl'
      }
    }
  })

  .state('tab.map', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      }
    })

  .state('tab.routeFinder', {
    url: '/routeFinder',
    views: {
      'tab-routeFinder': {
        templateUrl: 'templates/tab-routeFinder.html',
        controller: 'RouteFinderCtrl'
      }
    }
  })

  .state('tab.addIncident', {
    url: '/addIncident',
    views: {
      'tab-addIncident': {
        templateUrl: 'templates/tab-addIncident.html',
        controller: 'AddIncidentCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/homePage');

});
