const express = require('express')
const path = require('path')

//express() is a top-level function 
const app = express()

const public = path.join(__dirname, '../public')

// Static Assest location
app.use(express.static(public))

const port = 3000

app.get('', (req, res) => {
    res.send('Hello World!')
})

app.get('/help', (req, res) => {
    res.send('Help Page')
})

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        name: 'Siva', 
        Age: 30
    })
})


app.listen(port, () => {
    console.log('Server started in host 3000');
})