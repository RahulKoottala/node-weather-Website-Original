const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectory = path.join(__dirname,'../public')
//This is to change the views name to template
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engineand views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup - serving all the static conetnt
app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    //match up with the handlebar filename
    res.render('index', {
        title: 'Weather App',
        name: 'Rahul'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rahul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Vader Help',
        message: 'How can we help you?',
        name: 'Rahul'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a address to search'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if(error != undefined) {
            return res.send({error})
        } 
        forecast (latitude, longitude, 'm', (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                place,
                'currentWeather': forecastData.currentWeather,
                'temperature': forecastData.temperature,
                'feelsLike': forecastData.feelsLike,
                'humidity': forecastData.humidity,
                'icon' : forecastData.icon
            })
        })     
    })
})

app.get('/product',(req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404Page', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Rahul'
    })
})

app.get('*', (req,res) => {
    res.render('404Page',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Rahul'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})
