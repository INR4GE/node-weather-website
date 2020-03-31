const request = require('request')

const forecast = (latitude, longitude, cb) => {
    const url = 'https://api.darksky.net/forecast/a14cdfc5646007b624775f67ddc82db6/' + latitude + ',' + longitude + '?units=si&lang=en';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            cb('Unable to connect to weather service.');
        } else if (body.error) {
            cb('Unable to find location!');
        } else {
            cb(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% of rain. The minimum temperature is ${body.daily.data[0].temperatureLow}, while the maximum is ${body.daily.data[0].temperatureHigh}. The wind speed is ${body.currently.windSpeed}. And the pressure is ${body.currently.pressure}`);
        }
    })
}

module.exports = forecast
