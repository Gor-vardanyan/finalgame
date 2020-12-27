const mongoose = require("mongoose");
const mongouri = 'mongodb://127.0.0.1:27017/finalgamedb';
//conexion con mongo mediante funcion de mongoose
mongoose.connect('mongodb://localhost:27017/finalgamedb',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(()=>{console.log('conected to data base')})
.catch((error)=>{ console.error('there was a problem connecting to database' + error)});
