const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const bodyparser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const key = '77f97b598769bf8861004c74e30ebbba';
let city = 'Tartu'

app.get('/', function (req, res) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-273.15)
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
})

app.post('/', function (req,res){
    let city = req.body.cityname
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-273.15)
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
})

app.listen(3000)