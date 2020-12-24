const mongoose = require("Mongoose");
const mongouri = 'mongodb://localhost/finalgamedb';
mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(()=>{console.log('conected to data base')})
.catch((error)=>{ console.error('there was a problem connecting to database' + error)});