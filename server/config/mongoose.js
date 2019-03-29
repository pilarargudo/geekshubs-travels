//importamos librería para poder conectarnos
const mongoose = require('mongoose')

// como hemos definido los entornos, quedaría:
const {PORT, DB, HOST} = process.env.MongoDB;
mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`, {useNewUrlParser: true});

// exportamos para su uso
module.exports = mongoose;


