const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlers engine to views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

//Serve static directory to serve
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Daniel Garcia'
    });    
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Daniel Garcia'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Daniel G',
        helpText: 'This is some helpful text.'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error
            });
        }

        forecast(data, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                });
            }

            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Daniel Garcia',
        msg: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Daniel Garcia',
        msg: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`Server is up in port ${port}`);
});