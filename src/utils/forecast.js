const request = require('postman-request')

const forecast = (latitude, longitude, unit, weatherCallback) => {
    const url ='http://api.weatherstack.com/current?access_key=9cf81e135ba9a42537706f265e9232d4&query='+encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)+'&units='+encodeURIComponent(unit)
    //console.log(url)
    request({ url, json: true}, (error, {body} = {}) => {
        if(error) { 
            weatherCallback("Unable to connect to the weather service", undefined)
            //console.log("Unable to connect to the weather service")
        } else if (body.error) {
            weatherCallback("Unable to find location", undefined)
            //console.log("Unable to find location")
        } else {
            weatherCallback(undefined, {
                currentWeather : body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast