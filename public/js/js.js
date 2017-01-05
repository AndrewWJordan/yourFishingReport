$(document).ready(function(){
  var baseURL = 'https://data.ny.gov/resource/u3vi-zfp5.json?name=Esopus Creek';
  $('#result-table').dynatable();
  //$('#searchButton').on('click', function() {
    var name = $('#searchInput').val();
    var apiURL = baseURL;
  /*$.getJSON(apiCall, function(data) {
        $('#result-table').dynatable({
            dataset: {
                records: data
            }
        });
  });*/
  $.ajax({ 
    url: apiURL, 
    type: "GET", 
    data: { 
      "$limit" : 25, 
      "$$app_token" : "pZcBApJcX7oEFWwizD4j3JB7Q" 
    } 
  }).done(function(data) { 
    console.table(data);
    $('#result-table').dynatable({
      dataset: {
        records: data
      }
    });
    /*$.each(data, function(i) {
      $('#table-data').append(data[i].name + '<br>');
    });*/
  }); 
});
//});
