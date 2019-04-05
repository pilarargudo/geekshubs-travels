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

// upload image profile
router.post( '/profile', upload.single( 'image' ), function ( req, res, next ) {

  // validamos que está logeado
  if (req.session.user){

    if ( !req.file ) {
      res.render('profile.hbs', {
        ...loginData,
        // class para el body
        page: 'profile',
        // sobrescribo atributo
        title: 'Tu perfil - GeeksHubs Travels',
        error: 'la foto debe ser png',
        user: req.session.user,
       } );
    } else {

      console.log(req.file) // to see what is returned to you
      const image = {};
      image.url = req.file.url;
      image.id = req.file.public_id;
      image.path = req.file.path;
      image.originalname = req.file.originalname;

      User.create(image) // save image information in database
    .then(newImage => res.json(newImage))
    .catch(err => console.log(err));

        res.render('profile.hbs', {
          ...loginData,
          // class para el body
          page: 'profile',
          // sobrescribo atributo
          title: 'Tu perfil - GeeksHubs Travels',
          message: 'Foto subida',
          user: req.session.user,
          // de este modo se muestra pero no se guarda
          file: image.originalname
         } );
    }
    

  }
  else{
    res.render('login.hbs',{
     ...loginData,
      message: 'Por favor, inicia sesión para acceder a tu perfil'
    });
  }

} );



// para poder emplearlo:
module.exports = router;