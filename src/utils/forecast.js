const request = require('request');

const forecast = ({latitud, longitude} = {}, callback) => {
    const url = `https://api.darksky.net/forecast/a05887872e23b6b82c569aa6cd1aa5f3/${latitud},${longitude}?units=si`
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service');
        } else if(body.error){
            callback(body.error);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
        }
    });
}

module.exports = forecast;