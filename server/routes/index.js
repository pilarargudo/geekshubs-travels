const router = require('express').Router();
const express = require('../index.js')

// nos traemos los datod de las páginas
const homeData = require('../constants/homeData');
const loginData = require('../constants/loginData');
const registerData = require('../constants/registerData');

// inicio
router.get('/', (req, res) => {
  // ejecuta el archivo y lo renderiza con handlebars
  res.render('home.hbs', homeData );
})

// Register view
router.get('/register', (req, res) => {
  res.render('register.hbs', registerData );
})


// Login  view
router.get('/login', (req, res) => {
  res.render('login.hbs', loginData );
})

// Logout view
router.get('/logout', (req, res) => {
  // borramos todas las cookies
  req.session.destroy();
  
  res.redirect('/');
})


// Profile view
router.get('/profile', (req, res) => {
 // validamos que está logeado
 if (req.session.user){
  res.render('profile.hbs', loginData );
 }  else{
  // TODO página de error o enlace a login con el mensaje
  res.send('No estás autorizado')
 }


})

// para poder emplearlo:
module.exports = router;

// nos muestra los datos
//console.log(User)