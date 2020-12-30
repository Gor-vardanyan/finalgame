const mongoose = require("mongoose");
const mongouri = process.env.uri || 'mongodb://localhost:27017/finalgamedb';
//conexion con mongo mediante funcion de mongoose //connected to heroku
mongoose.connect(mongouri,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(()=>{console.log('conected to data base')})
.catch((error)=>{ console.error('there was a problem connecting to database' + error)});
