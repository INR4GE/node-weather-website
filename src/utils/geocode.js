const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaW5yNGdlIiwiYSI6ImNqeHgxMHNhYjBmejYzaGxmdWZ2dG5ldzQifQ.SFLwxhszdAfqloQHLEO_Xw&limit=1'
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location services')
        } else if (!body.features.length) {
            callback('Wrong location! Please try another.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode