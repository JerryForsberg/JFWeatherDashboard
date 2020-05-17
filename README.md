# JFWeatherDashboard
Purpose:
    The purpose of this app is to give the user the current weather and the 5 day forecast of whatever city they search for. The app leverages the OpenWeatherAPI, making two calls to retrieve the necessary data. Once a city is searched for, a button will be created underneath the search button that contains the city name of the search. If this newly created button is clicked again, the information for the city associated with that button will be searched for again. The current functionality and design of this app is at the basic stages. 
    
    To see how the app works, please follow this link for the deployed application: https://jerryforsberg.github.io/JFWeatherDashboard/

Technologies Used: 
    - HTML for basic structuring 
    - CSS and Bootstrap for styling 
    - Jquery and javascript to dynamically create elements and take information from the object returned from the API's.
    - OpenWeather API to obtain the weather information 
    
    

![blank dashboard](https://github.com/JerryForsberg/JFWeatherDashboard/blob/master/weather%20dashboard.PNG)



The most involved part of this code is a function which I named getAndShowWeather. This function is making both API calls, taking the data from the responses, and dynamcally creating elements and appending them to the page using that data. This function is also handling some of the styling of the app, specifically the uv index font coloring and the columns for the 5 day weather information. 

At first the front page of the app is very plain displaying only a search button and basically a blank page with a small amount of styling. The search button is doing most of the heavy lifting for this app. When the search button is clicked, the sections that display information are first cleared, and then the getAndShowWeather function runs and displays the information for whichever city is searched for. A button for that city is then created below the search button, so that the user can simply click that button to re-search for that city. 



![search](https://github.com/JerryForsberg/JFWeatherDashboard/blob/master/wd-2.PNG)



There are future opportunities with this app to work on some of the features that are not yet complete:
    - The app is not yet mobile functional
    - The app does not display the current date or weather icon in the current day information section
    - When initially loaded, the app could take the current location of the user and display the information before they search, or the       page could use more styling and filler so that it does not look so plain when the page is first loaded.
