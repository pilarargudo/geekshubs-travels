const router = require('express').Router();
const express = require('../index.js')
const gmail = require('../config/nodemailer.js');

// nos traemos el modelo del esquema de usuario
const User = require('../models/User');

// nos traemos los datos de las páginas
const homeData = require('../constants/homeData');
const loginData = require('../constants/loginData');
const registerData = require('../constants/registerData');

// router.get('/', (req, res) => {
//   res.send(process.env.NODE_ENV)
// });

// ruta para leer los usuarios
// router.get('/users', (req, res) => {
//   //petición sobre la colección de usuarios
//   // find recibe las opciones de búsqueda, como queremos todos, lo pasamos vacío
//   User.find({})
//   .then( users => {
//     res.send(users);
//   })
//   .catch( err => {
//     res.status(500).send(err);
//   })
// });


// Register data
router.post('/register', (req, res) => {  
  // console.log(req.body)
  new User(req.body)
  .save()
  .then( user => {  
    //res.send(user);

    // send email
    gmail.transporter.sendMail( {
      to: req.body.email,
      subject: 'Registro correcto',
      html: 'Welcome!'
    }, ( error, info ) => {
        console.log(error, info);
    } );

    // TODO no cambia la url, pero en el redirect no puedo mandarle mensajes
    // añadimos variable message al objeto  
    res.render('login.hbs', {
      ...loginData,
      message: 'Registro válido, ya puedes hacer login'
    } );
    // para redirect  + message: express-sessions
    //res.redirect(301, 'http://example.com');

  })  
  .catch( err => {
      res.status(400).render('register', {
        ...registerData,       
        error: err.message
      });
  }) 
});

// Login data
router.post( '/login', function ( req, res, next ) {

  //console.log(req.body);

  // validamos que tenemos los datos, si es vacío entrará también
  if (req.body.user && req.body.password) {
    User.findOne(req.body)
      .then( ( user ) => {
          // console.log( 'login valido', user );
          // necesitamos el if para mostrar los errores de los campos 
          // el exito/error es sobre el findOne, si no lo encuentra entonces pasará al catch
          if ( user ) {

              // definimos como session el user, no pasamos el pass, empleamos el lodash.pick
              req.session.user = user;              

              // redirigimos a perfil de usuario
              res.redirect('/profile');

          } else {
              res.render( 'login', {   
                ...loginData,          
                error: 'Ups! algo no ha ido bien, credenciales incorrectos',
                // TODO validar estos mensajes
                // error: err.message
              } );

          }
      } )
      .catch( ( err ) => {
          console.log( 'login invalido', err );

          res.status(500).render('login.hbs', {
             ...loginData,
              //error: err.message
              error: 'Ups algo no ha ido bien. Vuelva intentarlo más tarde.' 
            });

      } )
  } else {
    res.render( 'login', {             
      error: 'No se ha enviado usuario o contraseña',
      // TODO validar estos mensajes
      // error: err.message
    } );
  }

  
} );

// para poder emplearlo:
module.exports = router;
