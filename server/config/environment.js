// definimos el string de config
const environments = {
  production: "production",
  development: "development",
  test: "test"
}

// definimos el entorno de desarrollo por defecto si el usuario no lo define
const ENV = process.env.NODE_ENV || environments.development;

const config = {
  [environments.production]: {
    PORT: 80,
    MongoDB: {
      PORT: 27017,
      HOST: 'localhost',
      DB: 'Bootcamp'
    }
  },
  [environments.development]: {
    PORT: 3000,
    MongoDB: {
      PORT: 27017,
      HOST: 'localhost',
      DB: 'Bootcamp_dev'
    }
  },
  [environments.test]: {
    PORT: 3000,
    MongoDB: {
      PORT: 27017,
      HOST: 'localhost',
      DB: 'Bootcamp_test'
    }
  },
}

const CONFIG = config[ENV];

// si has puesto una config no existente nos avisará
if(!CONFIG) {
  throw new Error( 'NODE_ENV=${ENV} no es un entorno válido.');
}

console.log(CONFIG);

process.env = {
  // cogemos todo lo que existe
  ...process.env,
  // y le sumamos lo nuevo
  ...CONFIG
}
// console.log(process.env.MongoDB);