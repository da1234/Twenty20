getCrimes : function(lat,lng){



      return $http({ ///"+ lat.toString() +" &lng=" +  lng.toString()
    method: 'GET',
    url: "https://data.police.uk/api/crimes-at-location?date=2012-02&lat="+ lat.toString() +" &lng=" +  lng.toString()

    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available response.data

      var crimes = response.data;


      return crimes;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("here is the second Error" + response);
    });
     }



