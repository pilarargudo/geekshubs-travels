const router = require('express').Router();
const express = require('../index.js')

// nos traemos el modelo del esquema de usuario
const User = require('../models/User');

// nos traemos los datos de las páginas
const homeData = require('../models/homeData');
const loginData = require('../models/loginData');

// router.get('/', (req, res) => {
//   res.send(process.env.NODE_ENV)
// });

/**
 *Page Routers,
 */

// ruta para leer los usuarios
router.get('/users', (req, res) => {
  //petición sobre la colección de usuarios
  // find recibe las opciones de búsqueda, como queremos todos, lo pasamos vacío
  User.find({})
  .then( users => {
    res.send(users);
  })
  .catch( err => {
    res.status(500).send(err);
  })
});


// Register data
router.post('/register', (req, res) => {  
  // console.log(req.body)
  new User(req.body)
  .save()
  .then( user => {  
    //res.send(user);
    // TODO para pasar mensajes de error necesito express-sessions
    //res.redirect('/login');

    // // no cambia url
    // res.render('login.hbs', loginData );
    res.render('register', {
      title: 'Registro - GeeksHubs Travels',
      company: 'GeeksHubs Travels',
      imgBackground: 'travel_1.jpg',
      layout: 'auth',
      message: 'Registro válido, ya puedes hacer login'
    });

      // TODO sumar mensajes
    // res.render('login.hbs', loginData + {
    //   message: 'Registro válido, ya puedes hacer login'
    // });

  })  
  .catch( err => {
      res.status(400).render('register', {
        title: 'Registro - GeeksHubs Travels',
        company: 'GeeksHubs Travels',
        imgBackground: 'travel_1.jpg',
        layout: 'auth',
        //error: 'Registro inválido, revisa los campos'
        error: err.message
      });
  }) 
});

// Login data

router.post( '/login', function ( req, res, next ) {

  console.log(req.body);
  // validamos que tenemos los daros, si es vacío entrarña tambien
  if (req.body.user && req.body.password) {
    User.findOne(req.body)
      .then( ( user ) => {
          console.log( 'login valido', user );
          // necesitamos el if para mostrar los errores de los campos 
          // el exito/error es sobre el findOne, si no lo encuentra entonces pasará al catch
          if ( user ) {
              // res.render( 'login', {
              //   title: 'Identifícate - GeeksHubs Travels',
              //   company: 'GeeksHubs Travels',
              //   imgBackground: 'travel_1.jpg',
              //   layout: 'auth',
              //   message: 'Bienvenido ' + user.user
              // } );
              
              //res.render('home.hbs', homeData + {message: 'Bienvenido'} );
              res.render('home.hbs', homeData );

          } else {
              res.render( 'login', {             
                error: 'Ups! algo no ha ido bien, credenciales incorrectos',
                // TODO validar estos mensajes
                // error: err.message
              } );

          }
      } )
      .catch( ( err ) => {
          console.log( 'login invalido', err );

          res.status(500).render('login', {
              title: 'Registro - GeeksHubs Travels',
              company: 'GeeksHubs Travels',
              imgBackground: 'travel_1.jpg',
              layout: 'auth',
              //error: err.message
              error: 'Ups algo no ha ido bien.  vuelva intentarlo más tarde' 
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
