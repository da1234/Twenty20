angular.module('starterRoutes', [])

.factory('Routes', function($http) {
	var routes = [];
  return {
		getRoute : function(locations){
			var APIurl = "http://www.mapquestapi.com/directions/v2/alternateroutes?key=2POLviOwTbGo5Sh5dJrIO8R4cXGdelJR&from=" + locations.startLoc + "&to=" + locations.endLoc + "&timeOverage=50&routeType=pedestrian&maxRoutes=3"
			return $http({
    		method:'GET',
    		url: APIurl
			}).then(function(response){
				routes = response.data.route;
				return routes;
			}, function(error){
				console.log("Error in the getRoute function of routes.js : ", JSON.stringify(error));
			});
		},
    getCrimes : function(lat,lng){
      return $http({ ///"+ lat.toString() +" &lng=" +  lng.toString()
		    method: 'GET',
		    url: "https://data.police.uk/api/crimes-at-location?date=2012-02&lat="+ lat.toString() +" &lng=" +  lng.toString()
    	}).then(function successCallback(response) {
        var crimes = response.data;
        return crimes;
        }, function errorCallback(response) {
        console.log("Error in the getCrimes function of routes.js " + response);
        });
    },

    getLocalCrimes : function(lat, long){
      return $http({ ///"+ lat.toString() +" &lng=" +  lng.toString()
        method: 'GET',
        url: "https://data.police.uk/api/crimes-street/all-crime?lat=" + lat.toString() + "&lng=" + long.toString() + "&date=2012-01"
      }).then(function successCallback(response) {
      var mArray = [];
      for (i =0; i<90; i++){
        var crimes = response.data[i];//.alternateRoutes)//[0].route);
        var lat = crimes.location.latitude;
        var long = crimes.location.longitude;
        var crime = [parseFloat(lat), parseFloat(long), 1.0];
        mArray.push(crime);
      }
      return mArray;
      }, function errorCallback(response) {
        console.log("Error in the getCrimes function of routes.js " + response);
      });
     }
  }
});
