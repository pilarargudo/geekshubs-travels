// importamos mongoose
const  mongoose = require('mongoose');

// importamos solo pick de la librería lodash
const { pick } = require('lodash'); 

// creamos nueva instancia del esquema que está almacenado en mongoose
const UserSchema = new mongoose.Schema({
  // id viene automático por lo que no es necesario
  user: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  },
  image: { 
    data: Buffer, 
    type: String
  },


  }, {
    // es el estado por defecto
    // strict: true,
  }
);

// volvemos a definir esté método como función
UserSchema.methods.toJSON = function(){
    const user = this;
    // usamos librería pick de lodash: qué objeto, qué claves queremos
    return pick(user, ['_id', 'user', 'email']);
}

// TODO  revisar si lo uso o no
// para mantener el mismo esquema de datos que emplea moongose lo vamos a recibir nosotros también como objeto
// solo queremos recoger de lo que nos envíen email y password
UserSchema.statics.findByCredentials = ({ email, password }) => {
  console.log(email, password);

  // hacemos el filtro
  return User.findOne( {
    email, password
  })
}

//le pasamos dos páramatros: el nombre que el queremos dar a la colección y sobre que esquema se va a basar la colección
const User = mongoose.model('user', UserSchema);

// lo dejamos disponible para importar
module.exports = User;