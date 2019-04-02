const router = require('express').Router();
const express = require('../index.js')

// nos traemos los datod de las páginas
const homeData = require('../models/homeData');

/**
 *Page Routers,
 */


// inicio
router.get('/', (req, res) => {
  // ejecuta el archivo y lo renderiza con handlebars
  res.render('home.hbs', homeData );
})

// Register view
router.get('/register', (req, res) => {
  // ejecuta el archivo y lo renderiza con handlebars
  res.render('register.hbs', {
    title: 'Registro - GeeksHubs Travels',
    company: 'GeeksHubs Travels',
    imgBackground: 'travel_1.jpg',
    layout: 'auth',
  });
})


// Login  view
router.get('/login', (req, res) => {
  res.render('login.hbs', {
    title: 'Identifícate - GeeksHubs Travels',
    company: 'GeeksHubs Travels',
    imgBackground: 'travel_1.jpg',
    layout: 'auth',
  });
})

// para poder emplearlo:
module.exports = router;

// nos muestra los datos
//console.log(User)