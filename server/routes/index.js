const router = require('express').Router();
const express = require('../index.js')

const upload = require( '../config/multer' );

// nos traemos los datod de las páginas
const homeData = require('../constants/homeData');
const loginData = require('../constants/loginData');
const registerData = require('../constants/registerData');

// inicio
router.get('/', (req, res) => {
  // ejecuta el archivo y lo renderiza con handlebars
  res.render('home.hbs', {
    ...homeData,
    user: req.session.user
   } );
})

// Register view
router.get('/register', (req, res) => {

  if (req.session.user){    
    res.redirect('/profile');
  }
  else{
    res.render('register.hbs', registerData );
  }

})

// Login  view
router.get('/login', (req, res) => {

  if (req.session.user){    
    res.redirect('/profile');
  }
  else{
    res.render('login.hbs', loginData );
  }
 
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
    
    res.render('profile.hbs', {
      ...loginData,
      // class para el body
      page: 'profile',
      // sobrescribo atributo
      title: 'Tu perfil - GeeksHubs Travels',
      user: req.session.user,
     } );
  }
  else{
    // enlace a login con el mensaje
    res.render('login.hbs',{
     ...loginData,
      message: 'Por favor, inicia sesión para acceder a tu perfil'
    });
  }
})


// gatos
router.get( '/nuevoGato', function ( req, res, next ) {

  res.render( 'upload' )

} );
router.post( '/nuevoGato', upload.single( 'file' ), function ( req, res, next ) {

  if ( !req.file ) {
      res.render( 'upload', { message: 'la foto debe ser png' } )

  } else {
      res.render( 'upload', { message: 'Foto subida!' } )

  }

} );



// para poder emplearlo:
module.exports = router;

// nos muestra los datos
//console.log(User)