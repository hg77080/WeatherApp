# Weather App

The Weather App is a web-based application that allows users to retrieve historical weather information for specific geographic locations in the United States. By providing latitude and longitude coordinates,users can access weather data from a past point in time for the given location.

<img src='https://github.com/hg77080/WeatherApp/blob/main/public/HomeScreen.png'/>

## Features

- **Geographic Coordinates:** Input latitude and longitude values to specify the geographic location for which you want to retrieve historical weather data.

- **Weather Details:** Access detailed weather information such as temperature, humidity, wind speed, and more.

### APIs Used
[Open Weather APIs](https://www.weather.gov/)

### API Info
* Method: `GET`
* URL: `https://api.weather.gov/points/{latitude},{longitude}`,`https://api.weather.gov/gridpoints/${grid}/{x},{y}/forecast`
