angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('HomePageCtrl', function($scope) {})

.controller('MapCtrl', function($scope, $cordovaGeolocation, Routes) {

     $scope.$on("$ionicView.loaded", function() {
       var posOptions = {timeout: 100000000000000, enableHighAccuracy: false};
       var currentPos = $cordovaGeolocation.getCurrentPosition(posOptions);
       currentPos.then(function (position) {
          $scope.lat  = position.coords.latitude;
          $scope.long = position.coords.longitude;
          var lat = $scope.lat;
          var long = $scope.long;

            //<!-- Setting the maps view based on the longitude and latitude with zoom level 18 -->
            var map = L.map('map').setView([lat, long], 15);
            var locCrimes = Routes.getLocalCrimes(lat,long);
            locCrimes.then(function(crimesArrayResults){
              var crimesArray = crimesArrayResults;
              console.log(JSON.stringify(crimesArray));
              var heat = L.heatLayer(crimesArray, {radius: 100}).addTo(map);

              //<!-- z - zoom level, y - longitude, x - latitude -->
              var osm = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

              //<!-- adds marker to the map -->
              L.marker([lat, long]).addTo(map);

              //<!-- positions map using open street map -->
              L.tileLayer(osm).addTo(map);
              //THEN DO THE REST OF THE STUFF
            },function(err) {
              console.log("error with getting crime map points");
            });
          }, function(err) {
          console.log("error with geolocation");
          lat = 51.5257430;
          long = -0.1399230;
          var map = L.map('map').setView([lat, long], 15);

          // heat map layer
          // lat, lng, intensity (up to 1.0)
          // COORDINATES OF CRIMES, WITH THEIR INTENSITY (UP TO 1.0)
          var locCrimes = Routes.getLocalCrimes(lat,long);
          locCrimes.then(function(crimesArrayResults){
            var crimesArray = crimesArrayResults;
            console.log(JSON.stringify(crimesArray));
            var heat = L.heatLayer(crimesArray, {radius: 100}).addTo(map);
            
            //<!-- z - zoom level, y - longitude, x - latitude -->
            var osm = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

            //<!-- adds marker to the map -->
            L.marker([lat, long]).addTo(map);

            //<!-- positions map using open street map -->
            L.tileLayer(osm).addTo(map);
            //THEN DO THE REST OF THE STUFF
          },function(err) {
            console.log("error with getting crime map points");
          });
        });
     });
})

.controller('RouteFinderCtrl', function($scope, $stateParams, Routes) {
  $scope.SearchRoute = function(locations){
    var routeResults = Routes.getRoute(locations);
    routeResults.then(function(data1){
    var OrigMoves = data1.legs[0].maneuvers;
    var AltRoutes = data1.alternateRoutes;//[0].route.legs[0].maneuvers;
    var totCrimes= 0;
    var totAltCrimes = 0;

    ///these will be used to pick the best routes///
    var LeastCrimes = totCrimes;
    var BestRoute = data1.name;

    ////making a dictionary to compare routes ////
    var mMap = new Map();

    /////tallying up the no. of crimes in the first route /////
    for (var r=0; r<OrigMoves.length; r++){
      var startingLat = OrigMoves[r].startPoint.lat;
      var startingLng = OrigMoves[r].startPoint.lng;
      var mCrimes = Routes.getCrimes(startingLat, startingLng);
      mCrimes.then(function(data2){
         totCrimes = totCrimes + data2.length;
         mMap.set(data1.name, totCrimes);
      });
    };

    ////tallying up the alternate routes////
    for (var r = 0; r< AltRoutes.length; r++){
      AltMoves = AltRoutes[r].route.legs[0].maneuvers;
      var AltRouteName = AltRoutes[r].route.name;
      totAltCrimes = 0;
      for (var s=0; s<AltMoves.length; s++){
        var startingLat = AltMoves[s].startPoint.lat;
        var startingLng = AltMoves[s].startPoint.lng;
        var mCrimes = Routes.getCrimes(startingLat, startingLng);
        mCrimes.then(function(data2){
          totAltCrimes = totAltCrimes + data2.length;
          mMap.set(AltRouteName, totAltCrimes);

          ////comparing the no.  of crimes in both routes //////
          mMap.forEach(function(value, key) {
            // console.log(key + " = " + value);
            if(value < LeastCrimes){
              LeastCrimes = value;
              BestRoute = key;
            }
          }, mMap)

          $scope.routeSearchResults = data1;
          $scope.bestRoute = BestRoute;

          //Now search through data to find other info about the best route
          var altRoutes = data1.alternateRoutes;
          if(data1.name == BestRoute){
            var routeInfo = {
              name : data1.name,
              time : data1.formattedTime,
              legs : data1.legs[0].maneuvers
            };
            $scope.bestRouteInfo = routeInfo;
          }
          else{
            var altRoutes = data1.alternateRoutes;
            for(var i = 0; i < altRoutes.length; i++){
              if(altRoutes[i].route.name == BestRoute){
                var routeInfo = {
                  name : altRoutes[i].route.name,
                  time : altRoutes[i].route.formattedTime,
                  legs : altRoutes[i].route.legs[0].maneuvers
                };
                $scope.bestRouteInfo = routeInfo;
              }
            }
          }

        });
      };
    };

    locations.startLoc = '';
    locations.endLoc = '';

    });
  };
  $scope.showResultsFunc = function(){
    $scope.showForm = false;
    $scope.showResults = true;
  }
})

.controller('AddIncidentCtrl', function($scope) {});
