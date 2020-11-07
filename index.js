require('dotenv').config();
const express = require('express'); 
const app = express();
require('./config/mongo');

const port = process.env.PORT;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=> {
    res.send('EDIRECT CODING CHALLENGE ');
});
    

app.listen(port, () => console.log(`Listening port ${port}`));