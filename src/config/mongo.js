const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function() {
  console.log('Mongoose connection open to ' + process.env.DATABASE_STRING);
 });