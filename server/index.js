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

// iniciamos motor de las vistas con plantilla html con handlebars
app.set('view engine', 'hbs');

// definimos el directorio de las vistas, por defecto coge del directorio raíz
app.set('views', `${__dirname}/views`);

app.use(express.json());

// acceso a los recursos estáticos
app.use('/', express.static(`${__dirname}/public`))

// cuando alguien haga una petición le indicamos que pase por router, si este responde se le envía a cliente
app.use(router);

// TODO mover a routes?

// inicio
app.get('/', (req, res) => {
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
        text: 'texto texto texto', 
      }
    ],
    layout: 'template',
  });
})

// registro
app.get('/register', (req, res) => {
  // ejecuta el archivo y lo renderiza con handlebars
  res.render('register.hbs', {
    title: 'Registro - GeeksHubs Travels',
    company: 'GeeksHubs Travels',
    // para layout template
    // banner: [
    //   {slogan: '', subslogan: '', 
    //   button: '', linkButton:'', 
    //   imgBanner: '',}
    // ],
    imgBackground: 'travel_1.jpg',
    layout: 'auth',
  });
})

// login
app.get('/login', (req, res) => {
  // ejecuta el archivo y lo renderiza con handlebars
  res.render('login.hbs', {
    title: 'Identifícate - GeeksHubs Travels',
    company: 'GeeksHubs Travels',
    // para layout template
    // banner: [
    //   {slogan: '', subslogan: '', 
    //   button: '', linkButton:'', 
    //   imgBanner: '',}
    // ],
    imgBackground: 'travel_1.jpg',
    layout: 'auth',
  });
})

app.listen(PORT,() => {
  console.log(`http://localhost:${PORT}/`)
});
