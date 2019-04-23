const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a389468fb6e92f396b6f815a983b028b/' + latitude + ',' + longitude + '?units=si&lang=hu'

    request( { url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location')
        } else  {
            const degree = body.currently.temperature
            const chanceOfRain = (body.currently.precipProbability * 100).toFixed(0)
            const summary = body.daily.data[0].summary
            callback(undefined, `${summary} It is currently ${degree} degrees out. There is a ${chanceOfRain}% chance of rain.`)
        }
    })
}

module.exports = forecast