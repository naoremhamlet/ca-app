const express = require('express');
const { Router } = require('./router');
const app = express();
const PORT = process.env.PORT || 8000


const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors({
    origin : true,
    credentials : true
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use('/uploads', express.static('uploads'));

app.use(Router);

app.listen(PORT, async() => {
    console.log(`listening to localhost:${PORT}`)
})

module.exports = app;