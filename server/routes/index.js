const router = require('express').Router();
const express = require('../index.js')

// nos traemos el modelo del esquema de usuario
const User = require('../models/User');

// router.get('/', (req, res) => {
//   res.send(process.env.NODE_ENV)
// });

/**
 *Page Routers,
 */

// inicio
router.get('/', (req, res) => {
  // ejecuta el archivo y lo renderiza con handlebars
  res.render('home.hbs', {
    title: 'Bienvenido - GeeksHubs Travels',
    company: 'GeeksHubs Travels',
    banner: [
      {slogan: '¡Viaja!', subslogan: 'Descubre lugares maravillosos', 
      button: 'Ver destinos', linkButton:'#travels', 
      imgBanner: '',}
    ],    
    imgBackground: 'nathan-anderson-316188-unsplash.jpg',
    travels: [
      {id: 1, img: 'beijing.jpg', city: 'Beijing', discount: '90', price: '200'},
      {id: 2, img: 'buenos_aires.jpg', city: 'Buenos Aires', discount: '120', price:'300' },
      {id: 3, img: 'madrid.jpg', city: 'Madrid', discount: '85', price:'250' },
      {id: 4, img: 'ciudad_mexico.jpg', city: 'Ciudad de México', discount: '115', price:'450' },
      {id: 5, img: 'new_york.jpg', city: 'New York', discount: '65', price:'350' },
      {id: 6, img: 'tokyo.jpg', city: 'Tokyo', discount: '90', price:'320' },
    ],
    who: [
      {
        title: 'Quiénes somos',
        text: 'GeeksHubs Travels es una agencia de de viajes online creada en 2009 por un equipo de viajeros entusiastas que deciden hacer de su pasión por conocer el mundo un modo de vida. Desde nuestros inicios hemos diseñado más de 500 viajes organizados a diferentes destinos de Europa, Norteamérica y Asia. Nuestro objetivo ahora es ir ampliando horizontes.', 
        button: 'Descubrir', 
        linkButton:'#', 
        imgBanner: 'travel_3.jpg'
      }
    ],
    contact: [
      {
        title: 'Contacta con nosotros',
        text: 'No dudes en contactar con nosotros por cualquier duda o sugerencia.', 
      }
    ],
    layout: 'template',
  });
})

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

// Register
// view
router.get('/register', (req, res) => {
  // ejecuta el archivo y lo renderiza con handlebars
  res.render('register.hbs', {
    title: 'Registro - GeeksHubs Travels',
    company: 'GeeksHubs Travels',
    imgBackground: 'travel_1.jpg',
    layout: 'auth',
  });
})
// data
router.post('/register', (req, res) => {  
  // console.log(req.body)
 // una vez enviamos datos desde cliente (postman, cliente, bd json): 
  new User(req.body)
  .save()
  .then( user => {
    //res.send(user);
    //res.redirect('/register');
    // mostrar mensaaje de éxito
    res.render('login', {
      // TODO ver posibilidad de no tener que repetir todos los atributos
      title: 'Identifícate - GeeksHubs Travels',
      company: 'GeeksHubs Travels',
      imgBackground: 'travel_1.jpg',
      layout: 'auth',
      message: 'Registro válido, ya puedes hacer login'
    });

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

// Login

// view
router.get('/login', (req, res) => {
  res.render('login.hbs', {
    title: 'Identifícate - GeeksHubs Travels',
    company: 'GeeksHubs Travels',
    imgBackground: 'travel_1.jpg',
    layout: 'auth',
  });
})

// data
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
              res.render( 'login', { 
                title: 'Identifícate - GeeksHubs Travels',
                company: 'GeeksHubs Travels',
                imgBackground: 'travel_1.jpg',
                layout: 'auth',
                message: 'Bienvenido ' + user.user
              } );

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

// nos muestra los datos
//console.log(User)