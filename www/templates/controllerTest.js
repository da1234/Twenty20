.controller('RouteFinderCtrl', function($scope, $stateParams, Routes) {
  // var response = Routes.all(); //returns list with route, and alternative routes inside that
  // response.then(function(data){
  //   $scope.routes = data;
  // });

  $scope.SearchRoute = function(locations){
    var routeResults = Routes.getRoute(locations);
    routeResults.then(function(data1){

      //console.log("data is:" +data1.legs[0]);
      //$scope.routeSearchResults = data1;
    //});

  

    var OrigMoves = data1.legs[0].maneuvers;

    var AltRoutes = data1.alternateRoutes;//[0].route.legs[0].maneuvers;

    var totCrimes= 0;

    var totAltCrimes = 0; 




    ///these will be used to pick the best routes///

    var BestRoute = '';
    // var LeastCrimes

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

    
    for( var r = 0; r< AltRoutes.length; r++){


       AltMoves = AltRoutes[r].route.legs[0].maneuvers;

       var AltRouteName = AltRoutes[r].route.name;

      for (var s=0; s<AltMoves.length; s++){


      var startingLat = AltMoves[s].startPoint.lat;
      var startingLng = AltMoves[s].startPoint.lng;

      var mCrimes = Routes.getCrimes(startingLat, startingLng);

      mCrimes.then(function(data2){

        totAltCrimes = totAltCrimes + data2.length;


        mMap.set(AltRouteName, totAltCrimes);



        ////comparing the no.  of crimes in both routes //////

        var LeastCrimes = totCrimes;


        for (var [key, value] of mMap) {


          if (value < LeastCrimes){


            BestRoute = key;

        //     console.log("this is the maps key/value set " + key + value);

        // console.log("Best route is: "+ BestRoute);
          }
      
      };
    });
  };


 };

    $scope.routeSearchResults = data1;

    locations.startLoc = '';
    locations.endLoc = '';

    });
 
  };

})