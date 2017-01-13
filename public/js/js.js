$(document).ready(function () {

    // NY Recommended Fishing Streams and Rivers API
    var baseURL = 'https://data.ny.gov/resource/u3vi-zfp5.json?name=';

    // Prints success or failure message based on search result
    function searchAlert(status) {
        //remove existing classes
        $('#searchAlert').removeClass();
        $('#searchAlert').addClass('alert-' + status + ' alert');
        if (status == 'success') {
            $('#searchAlert').text("Nailed it! Your results are below.");
        } else {
            $('#searchAlert').text("Oh shucks! Your search yields 0 results.  Try again!");
        }
        $('#searchAlert').fadeIn('slow');
    }
    $('#searchButton').on('click', function (e) {
        e.preventDefault();
        // Get users search input from header
        var name = $('#searchInput').val();
        var apiURL = baseURL + name;
        $.ajax({
            url: apiURL,
            type: "GET",
            data: {
                "$limit": 25,
                "$$app_token": "pZcBApJcX7oEFWwizD4j3JB7Q"
            }
        }).done(function (data) {
            if (data.length > 1) {
                searchAlert('success');
                $('#result-table').dynatable({
                    dataset: {
                        records: data
                    }
                });
            } else {
                searchAlert('warning');
            }
        });
    });


    // User report flow code
    // Triggered when the user clicks the Next submit button
    // Loads the next form field grouping
    $('#mapNextBtn').on('click', function () {
        $('#dynamicContentWrapper').load('report.html').fadeIn('slow');
    })
});
