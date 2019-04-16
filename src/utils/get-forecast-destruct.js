const request = require('request')

const forecastdtl = (lat, log, callback) => {
    const url = `https://api.darksky.net/forecast/58a27f2eedc77d1fc47f66b7ebd0fed0/${lat},${log}?units=si`

    request({ url, json: true }, (error, wresponse) => {

        if (error) {
            callback('The weather service is not available', undefined);
        } else if (wresponse.body.error) {
            callback('Unable to get the weather for the location', undefined);
        } else {
            callback(undefined, {
                Temperature: wresponse.body.currently.temperature,
                Summary: wresponse.body.currently.summary,
                Preciption: `${wresponse.body.currently.summary}. Current Temperature is${wresponse.body.currently.temperature} with ${wresponse.body.currently.precipProbability}% of rain`
            })
        }
    })
}

module.exports = {
    forecastdtl: forecastdtl
}
