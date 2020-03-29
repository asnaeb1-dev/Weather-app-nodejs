//get npm packages access into your project
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fetch = require('node-fetch');

//get express fucnction to be used
const app = express();
const port = process.env.PORT || 3000

//Define paths for express configuration
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir =  path.join(__dirname, '../templates/partials');

//Setup handlebars views and view engine
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather app',
        name : 'abhigyan raha'
    });
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About',
        name : 'Abhigyan Raha'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help page',
        name: 'Abhigyan Raha',
        message: 'Help will be offered to those who seek in Hogwards!'
    })
})

app.get('/product', (req, res) =>{
    console.log(req.query);
    if(!req.query.search){
        res.send('<h2>Must provide a search term</h2>')
        return;
    }
    res.send({
        products:[]
    })
    
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error : 'sorry, address is required!'
        })
        return;
    }
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+req.query.address+'&appid=edca18a50304821d471e07cf0fa9f4d0')
        .then(response => response.json())
        .then(json => res.send(json))
  })

app.get('/help/*', (req, res) => {
    res.render('help', {
        title:'Help page',
        name: 'Abhigyan Raha',
        message: 'Help will be offered to those who seek in Hogwards!'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        
    })
})

app.listen(port, () =>{
    console.log('Server is up and running at '+ port)
})

