var apiKey = '8168c800802d67f2a69af5d521e45605';
var baseUrl = 'http://api.openweathermap.org/data/2.5/';
var searchButton = document.getElementById('button-addon2');

// second call
// https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=minutely,hourly&appid=8168c800802d67f2a69af5d521e45605&units=imperial

$(searchButton).on('click', function () {
    $('#info').empty();
    $('#5day').empty();

    // compose api url 
    var userCityInput = $('#userInput').val();
    $('#userInput').empty();

    firstApiUrl = baseUrl + "find?q=" + userCityInput + "&appid=" + apiKey;
    console.log("first", firstApiUrl);

    // recreate this
    var searchHistory = [];
    searchHistory.push(userCityInput);
    for (var i = 0; i < searchHistory.length; i++) {
        searchHistory[i];
        var newCityButton = $('<button>').attr('type', 'button');
        newCityButton.text(userCityInput);
        newCityButton.attr('class', 'btn btn-light');
        newCityButton.attr('data-city', userCityInput);
        $('#searchHistory').prepend(newCityButton);
        newCityButton.on('click', function () {
            $('#info').empty();
            $('#5day').empty();
            var repeatedCity = $(this).attr('data-city');
            console.log(repeatedCity);
            var repeatedUrl = baseUrl + "find?q=" + repeatedCity + "&appid=" + apiKey;
            getAndShowWeather(repeatedUrl);






            // <button type="button" class="btn btn-light">London</button>
            // searchHistoryButton // <button type="button" class="btn btn-light">London</button>

        });
        getAndShowWeather(firstApiUrl);
    };

});





function getAndShowWeather(firstApiUrl) {
    $.ajax({
        url: firstApiUrl,
        method: 'GET'
    }).then(function (response) {
        // if (response.list.length > 1) {
        //     // some future error handling for case where more than one result is returned
        // }
        console.log(response);
        // compose your info section 
        var lat = response.list[0].coord.lat;
        var lon = response.list[0].coord.lon;

        var formattedDate = convertUnixTimestamp(response.list[0].dt);
        console.log('formatted date is', formattedDate);

        secondApiUrl = baseUrl + "onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + apiKey + '&units=imperial';
        console.log(secondApiUrl);
        var firstResponse = response;
        $.ajax({
            url: secondApiUrl,
            method: 'GET'
        }).then(function (response) {

            var cityparagraph = document.createElement("h1");
            cityparagraph.innerText = firstResponse.list[0].name;
            $('#info').append(cityparagraph);


            var tempParagraph = document.createElement("p");
            tempParagraph.innerText = "Temperature: " + response.current.temp;
            $('#info').append(tempParagraph);


            var humidityParagraph = document.createElement('p');
            humidityParagraph.innerText = "Humidity: " + response.current.humidity;
            $('#info').append(humidityParagraph);

            var windSpeedParagraph = document.createElement("p");
            windSpeedParagraph.innerText = "Speed: " + response.current.wind_speed;
            $('#info').append(windSpeedParagraph);

            var uviParagraph = document.createElement("p");
            uviParagraph.innerText = "UV index: " + response.current.uvi;
            var displayUvi = response.current.uvi;
            $(uviParagraph).attr('id', 'uvi');
            $('#info').append(uviParagraph);
            if (displayUvi <= 2) {
                document.getElementById('uvi').style.backgroundColor = 'green';

            } else if (displayUvi <= 5) {
                document.getElementById('uvi').style.backgroundColor = 'yellow';
            } else if (displayUvi <= 7) {
                document.getElementById('uvi').style.backgroundColor = 'orange';
            } else {
                document.getElementById('uvi').style.backgroundColor = 'red';
            };

            // var formattedDate = convertUnixTimestamp(response.list[0].dt);
            // console.log('formatted date is', formattedDate);
            // compose your 5-day forecast
            //take the lat/lon from the initial api call and use them for the 5 day forecast call

            var fiveDay = [0, 1, 2, 3, 4]
            for (var i = 0; i < fiveDay.length; i++) {
                var date = convertUnixTimestamp(response.daily[i].dt);

                var icon = response.daily[i].weather[0].icon;
                var temp = response.daily[i].temp.day;
                var humid = response.daily[i].humidity;
                var day = response.daily[i]


                var day5Div = document.createElement("div");
                $(day5Div).addClass("card text-white bg-primary mb-3");
                $('#5day').append(day5Div);



                var headerDiv = document.createElement("div");
                $(headerDiv).addClass("card-header");
                headerDiv.textContent = date;
                $(day5Div).append(headerDiv);

                var bodyDiv = $('<div>');
                $(bodyDiv).addClass("card-body");
                $(day5Div).append(bodyDiv);

                var iconImg = $('<img>');
                iconImg.attr('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png");
                bodyDiv.append(iconImg);

                var tempParagraph = document.createElement("p");
                tempParagraph.innerText = "Temperature: " + temp;
                bodyDiv.append(tempParagraph);

                var humidityParagraph = document.createElement("p");
                humidityParagraph.innerText = "Humidity: " + humid;
                bodyDiv.append(humidityParagraph);

            }

        });
    });
}



function convertUnixTimestamp(timestamp) {
    var date = new Date(timestamp * 1000);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}