// primero definimos la configuración con la variable de entorno
require('./config');

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

const router = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

// iniciamos motor de las vistas con plantilla html
app.set('view engine', 'hbs');

// definimos el directorio de las vistas, por defecto coge del directorio raíz
app.set('views', `${__dirname}/views`);

app.use(express.json());

// acceso a los recursos estáticos
app.use('/', express.static(`${__dirname}/public`))

// cuando alguien haga una petición le indicamos que pase por router, si este responde se le envía a cliente
app.use(router);

// TODO mover a routes?

// primera ruta para validar el renderizado de plantillas
app.get('/', (req, res) => {
  // ejecuta el archivo y lo renderiza con handlebars
  res.render('home.hbs', {
    title: 'GeeksHubs Travel',
    users: [
      {id: 1, name: 'Pilar',},
      {id: 2, name: 'Cris',},
      {id: 3, name: 'Toni',},
    ],
    admin: {
      name: 'Iván',
      fullname: 'Iván Ruiz'
    },
    layout: 'template',
  });
})

app.listen(PORT,() => {
  console.log(`http://localhost:${PORT}/`)
});
