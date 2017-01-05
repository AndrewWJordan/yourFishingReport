$(document).ready(function(){
  // NY Recommended Fishing Streams and Rivers API
  var baseURL = 'https://data.ny.gov/resource/u3vi-zfp5.json?name=';
  $('#searchButton').on('click', function(e) {
    e.preventDefault();
    // Get users search input from header
    var name = $('#searchInput').val();
    var apiURL = baseURL + name;
  $.ajax({ 
    url: apiURL, 
    type: "GET", 
    data: { 
      "$limit" : 25, 
      "$$app_token" : "pZcBApJcX7oEFWwizD4j3JB7Q" 
    } 
  }).done(function(data) { 
    $('#result-table').dynatable({
      dataset: {
        records: data
      }
    });
  }); 
  });
});
