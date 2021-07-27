const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=779f25bb6260f55bf811b481f723be26&query=' +encodeURIComponent(latitude+','+longitude)+ '&units=f'
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            const current = body.current
            // console.log(current)
            // console.log(url)
            const {temperature: temp, feelslike: apptemp} = current
            callback(undefined,
                (current.weather_descriptions[0]+ '. It is currently ' +temp+ ' degrees out. It feels like ' +apptemp+ ' out.')
            )
        }
    })
}

module.exports = forecast
