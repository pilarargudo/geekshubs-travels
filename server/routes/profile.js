const router = require('express').Router();

const upload = require( '../config/multer' );

// nos traemos los datod de las páginas
const loginData = require('../constants/loginData');

// nos traemos el modelo del esquema de usuario
const User = require('../models/User');

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


// para poder emplearlo:
module.exports = router;