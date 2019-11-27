# Weather App
This weather app with 5 day forecast uses 2 APIs:

1. The [Google Places API](https://developers.google.com/places/web-service/intro?hl=en_US) which is used to autofill the city input field. Start typing and the API will give you a selection of cities from which to choose.
2. The weather data comes from the [OpenWeather API](https://openweathermap.org/api).

Both of these APIs are free to use with the usual requirement that you need to sign up and get an API key and there are some restrictions as to the number of calls to the API per day, but for a small app like this one it is not an issue.

### How does this work?

The Google Places API is pretty easy to set up and use. You should be careful to add options (i.e. cities only) to restrict the amount of data being returned and therefore reducing the risk of being billed for data that you are not using. You will note that after selecting one of Google's suggestions, you can tab to the submit button and press enter to retrieve the data - the input field is cleared for a new search and the weather data appears. 

The OpenWeather API that I'm using provides for fetching current weather data for the selected city as well as a 5 day / 3 hour forecast. The current weather part is straight forward, however, the forecast data returns an array of 40 items (1 every 3 hours (8 per day) * 5 days). This is way too much data for this simple interface, so I needed to find a way to limit the data to one of those forecast items per day.

What I chose to do was use the forecast data for noon of each day - this will give a sort of average temperature for each day. Good enough for a forecast overview.

The icons are part of the data set. The temeratures are returned in Kelvin units. There is an otion to add `units=imperial` or `units=metric` to the query string but I opted to do an inline conversion to Celcius. A similar conversion was done for the wind speed.

The footer link is part of the design of some of the widgets which can be seen on the [OpenWeather website](https://openweathermap.org/widgets-constructor). It's not obligatory to add this; I just wanted to show my appreciation.

Clicking on the 'Go!' button if the input field is empty will remove any returned data and show an error message.

When a new search is initated by clicking or tapping in the input field, the current search result is removed.

It's also possible to add all sorts of enhancements. For example, given the current temperature and weather conditions, you could add a custom message: Temp > 0degC and rain you could add a custom message "Go get your unbrella!" or Temp < 0degC and snow, message: "Looks like winter is here. Don't slip on the ice!".

Have fun!