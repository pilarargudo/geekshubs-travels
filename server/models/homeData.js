
const homeData = {
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
}

// lo dejamos disponible para importar
module.exports = homeData;