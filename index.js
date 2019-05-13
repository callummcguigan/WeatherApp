//jshint esversion: 6


    $("#usercity").val("");
    // Update Dom
    function updateDOM(data) {
      var city = data.name;
      var temp = Math.round(data.main.temp);
      var desc = data.weather[0].main;

      var icon = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";

      $('#city').html(city);
      $('#temp').html(temp + '&#176;');
      $('#desc').html(desc);

      $('#icon').attr('src', iconurl);

      $("#usercity").val(city);
    }



    function getWeather(){

      var usercity = $("#usercity").val();

      var URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + usercity + '&units=metric&APPID=d92d3132f015f2ae54c0c9d864fe8160';

      $.getJSON(URL, function(data) {
          console.log(data);
          updateDOM(data);
      });
    }

    function getLocalWeather(){

      $("#usercity").val("");
      // Get Location
      navigator.geolocation.getCurrentPosition(success, error);

      function success(pos) {
          var lat = pos.coords.latitude;
          var long = pos.coords.longitude;
          weather(lat, long);
          console.log(lat);
          console.log(long);
      }

      function error() {
          console.log('There was an error');
      }

      // Call Weather
      function weather(lat, long) {
          var URL = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + long + '&units=metric&appid=d92d3132f015f2ae54c0c9d864fe8160';

          $.getJSON(URL, function(data) {
              console.log(data);
              updateDOM(data);
          });
      }
    }
