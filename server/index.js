// primero definimos la configuración con la variable de entorno
require('./config');

// nodemailer config
require('./config/nodemailer.js');

// nos creamos nuestro servidor de express
const express = require('express');

// todo el servidor tendrá está librería Handlebars para gestión de plantillas html
const hbs = require('hbs');

// pasamos a emplear hbsUtils para que registre los cambios
const hbsUtils = require('hbs-utils')(hbs);

// definimos que registre los parciales
hbs.registerPartials(`${__dirname}/views/partials`)

// definimos que registre los  cambios en los parciales
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`)

//logs
var logger = require('morgan');

const indexRouter = require('./routes/');
const usersRouter = require('./routes/users');

var session = require('express-session');

//Gestión de la sesión.
app.use(session({
  // Clave con la que se va a firmar el ID de las cookies
  secret: '1234',
  // Nombre de la cookie
  name: 'register-demo',
  // Si se debe reguardar el objeto completo o no en cada petición.
  resave: true,
  // Si la sesión se debe guardar al crearla aunque no la modifiquemos.
  saveUninitialized: true
  }));






const PORT = process.env.PORT || 3000;

const app = express();

// iniciamos motor de las vistas con plantilla html con handlebars
app.set('view engine', 'hbs');

// definimos el directorio de las vistas, por defecto coge del directorio raíz
app.set('views', `${__dirname}/views`);

// mostrar logs
app.use(logger('dev'));

// formateo datos en json
app.use(express.json());

//formateo form-data
app.use(express.urlencoded());

// acceso a los recursos estáticos
app.use('/', express.static(`${__dirname}/public`))

// cuando alguien haga una petición le indicamos que pase por router, si este responde se le envía a cliente
app.use(indexRouter);
app.use(usersRouter);

// sass middleware
var sass = require('node-sass-middleware');

 app.use(
     sass({
         src: __dirname + '/sass',    // Input SASS files
         dest: __dirname + '/public/', // Output CSS
         debug: true                
     })
 );

app.listen(PORT,() => {
  console.log(`http://localhost:${PORT}/`)
});