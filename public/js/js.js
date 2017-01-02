$(document).ready(function(){
  $.ajax({ 
    url: "https://data.ny.gov/resource/u3vi-zfp5.json?name=Esopus Creek", 
    type: "GET", 
    data: { 
      "$limit" : 10, 
      "$$app_token" : "pZcBApJcX7oEFWwizD4j3JB7Q" 
    } 
  }).done(function(data) { 
    $.each(data, function(i) {
      $('#table-data').append(data[i].name + '<br>');
    });
  }); 
});
