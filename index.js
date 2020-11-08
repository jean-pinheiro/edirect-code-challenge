require('dotenv').config();
const express = require('express'); 
const app = express();
const cors = require('cors');
require('./src/config/mongo');

const taskRoute = require('./src/routes/taskRoute');
const projectRoute = require('./src/routes/projectRoute');

const bodyParser = require('body-parser');
const port = process.env.PORT;
app.use(cors())
.use(bodyParser.json({ limit: '300mb' }))
.use('/api/task', taskRoute)
.use('/api/project', projectRoute);

//.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res)=> {
    res.send('EDIRECT CODING CHALLENGE ');
});
    

app.listen(port, () => console.log(`Listening port ${port}`));