require('dotenv').config();
const express = require('express'); 
const app = express();
const cors = require('cors');
require('./src/config/mongo');

const taskRoute = require('./src/routes/taskRoute');
const projectRoute = require('./src/routes/projectRoute');
const userRoute = require('./src/routes/userRoute');

const bodyParser = require('body-parser');
const port = process.env.PORT;
app.use(cors())
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))
.use('/api/task', taskRoute)
.use('/api/project', projectRoute)
.use('/api/user', userRoute);

//.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res)=> {
    res.send('EDIRECT CODING CHALLENGE ');
});
    

app.listen(port, () => console.log(`Listening port ${port}`));