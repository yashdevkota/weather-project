const request = require('postman-request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFzaGNmYyIsImEiOiJjazk0ZGw4bzYwOTFvM21ydWIzbDhmdmswIn0.Q5sqJTlN5c3ARxXDpreA_Q&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Server Issue.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                'latitude': body.features[0].center[1],
                'longitude': body.features[0].center[0],
                'location': body.features[0].place_name
            })
        }
    })
}

module.exports = geocode