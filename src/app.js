const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set handlebars views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        name: 'Yash Devkota',
        title: 'Weather App'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Yash Devkota',
        title: 'About me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        name: 'Yash Devkota',
        title: 'Help Page'

    })
})

app.get('/weather', ({ query }, res) => {
    if (!query.address) {
        return res.send({
            error: 'Address not provided'
        })
    }
    geocode(query.address, (error, { latitude, longitude, location } = {}) => {
        if (error)
            return res.send({ error })

        forecast(latitude, longitude, (error, { forecast } = {}) => {
            if (error)
                return res.send({ error })

            res.send({
                forecast: forecast,
                location: location,
                address: query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Yash Devkota',
        title: 404,
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Yash Devkota',
        title: 404,
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server Start on port ' + port)
})