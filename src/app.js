const express = require('express')
const path = require('path')
const hbs = require('hbs')

//express() is a top-level function 
const app = express()

// Serving app the public directry - With this if the html page name is called the page is shown in browser
const publicDirectryPath = path.join(__dirname, '../public')
//set viewPath for customized folder name instead of VIEW fodler name
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//handlebars set to express
app.set('view engine', 'hbs')
//set the views folder to a different fodler name
app.set('views', viewPath)
//register partials
hbs.registerPartials(partialPath)


// Static Assest location
app.use(express.static(publicDirectryPath))

const port = 3000

//geocode requirement
const ggeocodejs = require('./utils/get-geocode-destruct')
const gforecastjs = require('./utils/get-forecast-destruct')

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Siva'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Siva'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Siva',
        message: 'This is the message for the help page - For testing purpose'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            Error: 'An address must be provided'
        })
    }

    ggeocodejs.geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        gforecastjs.forecastdtl(latitude, longtitude, (error, { Temperature, Preciption, Summary } = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                latitude,
                longtitude,
                Temperature,
                Summary,
                Preciption: Preciption + '% of rain'
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help article',
        name: 'Siva',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Siva',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server started in host 3000');
})