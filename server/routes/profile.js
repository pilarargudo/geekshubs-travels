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


// TODO pasar el mensaje en un toast
// TODO error en el que permite mandar sin contraseña y se queda vacío el valor del campo ¿patch?
// TODO render/redirect
// TODO ver si todo esto es necesario o se puede simplificar
// TODO si los campos no se modifican todos, no lo envía y no se recarga
router.post( '/profile', function ( req, res, next ) {

  //console.log(req.body);
  // validamos que tenemos los datos, si es vacío entrará también
  if (req.body.user && req.body.email) {
    User.findOneAndUpdate(req.body)
      .then( ( user ) => {
          // es null
          //req.session.user = user;  
          console.log( 'user valido', user );
          // necesitamos el if para mostrar los errores de los campos 
          // el exito/error es sobre el findOne, si no lo encuentra entonces pasará al catch
          if ( user ) {
              // definimos como session el user
              req.session.user = user;             
              // perfil de usuario de nuevo y con mensaje de éxito de guardados
              // TODO no actualiza los datos ya que la sesión de usuario guardada es la anterior al cambio
              res.render('profile.hbs', {
                          ...loginData,
                          page: 'profile',
                          title: 'Tu perfil - GeeksHubs Travels',
                          message: 'Perfil actualizado',
                          user: req.session.user,
                         } );
              // OPCION REDIRECT
              //res.redirect('/profile');
          } else {
            res.render('profile.hbs', {
              ...loginData,
              // class para el body
              page: 'profile',
              // sobrescribo atributo
              title: 'Tu perfil - GeeksHubs Travels',
              error: 'Error, revisa tus datos',
              user: req.session.user,
             } );
          }
      } )
      .catch( ( err ) => {
          console.log( 'datos del form incorrectos', err );
          res.status(500).render('profile.hbs', {
            ...loginData,
            page: 'profile',
            title: 'Tu perfil - GeeksHubs Travels',
            error: 'Ups algo no ha ido bien. Vuelva intentarlo más tarde.'
           } );

      } )
  } else {
    console.log( 'actualizar perfil inválido desde el else');
    res.render( 'profile.hbs', {  
      ...loginData,
      page: 'profile',
      title: 'Tu perfil - GeeksHubs Travels',
      error: 'Error en los datos del formulario'
    } );
  }

} );



// para poder emplearlo:
module.exports = router;