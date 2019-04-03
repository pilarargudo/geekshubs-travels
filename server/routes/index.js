const router = require('express').Router();
const express = require('../index.js')

// nos traemos los datod de las páginas
const homeData = require('../constants/homeData');
const loginData = require('../constants/loginData');
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
  res.render('login.hbs', loginData );
})

// para poder emplearlo:
module.exports = router;

// nos muestra los datos
//console.log(User)