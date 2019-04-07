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
                // TODO ¿es posible enviar estos mensajes? o solo en el catch como en register?
                // revisar resto de login
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
    console.log( 'login invalido desde el else');

    res.render( 'login.hbs', {  
      ...loginData, 
      error: 'No se ha enviado usuario o contraseña',
    } );
  } 

});

// recovery con param email optativo
router.get( '/recovery/:email?', function ( req, res, next ) {

  
  // req.toastr.info('Are you the 6 fingered man?');
  //   req.toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!', null, {
  //     closeButton: false
  //   });
  //   req.toastr.success('Have fun storming the castle!', 'Miracle Max Says', null, {
  //     newestOnTop: true
  //   });
  //   req.toastr.error('I do not think that word means what you think it means.', 'Inconceivable!');
    //return res.end();

  res.render( 'recovery', { 
    ...loginData, 
    email: req.params.email 
  } );
} );

router.post( '/recovery/', function ( req, res, next ) {
  
  //winston.info( 'email to recovery:', req.body.email );

  User.findOne( { email: req.body.email } ).then(
      ( user ) => {
          
          if ( !user ) {    

            // TODO toastr
            //req.toastr.info('Are you the 6 fingered man?')

            res.render( 'recovery', { 
              ...loginData, 
              error: 'Ups! Por favor, revisa tu correo electrónico.' 
            } );                    
          }


          else{
            // TODO redirect home y mostrar mensaje en el toast
            res.render( 'recovery', { 
              ...loginData, 
              //message: 'Si el email estaba registrado le enviaremos un email con su contraseña.' 
            } );

            gmail.transporter.sendMail( {
                  to: req.body.email,
                  subject: 'Recuperar contraseña',
                  html: `
                        <h4>Tu contraseña es: <strong>${user.password}</strong></h4>
                        <p>                          
                          <a href="http://localhost:3000/login/">LOGIN</a>
                        </p>
                    `
              }, ( error, info ) => {
                  //winston.info( error, info );
              } );
          }

      }
  ).catch( console.error )

} );




// para poder emplearlo:
module.exports = router;
