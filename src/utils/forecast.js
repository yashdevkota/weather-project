const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b31d1d154172b7003baf52dc1ce58243&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Server Issue.')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, {
                forecast: body.current.weather_descriptions[0] + '. Temp is : ' + body.current.temperature + ' degrees and there is a ' + body.current.precip + '% chance of rain'
            })
        }
    })
}

module.exports = forecast