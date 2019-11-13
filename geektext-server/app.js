const express = require('express');
const app = express();
const mongoose = require('mongoose'); //Used to interact with our mongoDB Database
const bodyParser = require('body-parser');
const cors = require('cors');

//Imports dotenv file
require('dotenv/config')
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Middleware to import get routes
const getRoutes = require('./routes/gets');
app.use('/get', getRoutes)

const postRoutes = require('./routes/posts');
app.use('/post', postRoutes)

//Connects our application to our mongoDB cluster
mongoose.connect(process.env.DB_CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err)
        throw err
    else
        console.log('Connected to mongoDB Cluster')
})

//Sample route
//When we visit localhost:3000/ we will be greeted by the sentence "geektext home"

//Populate reviews! (default)
// app.get('/get/reviews', (req, res) => {
//     res.send(result);
// })


//App is listen to requests on port 3000
app.listen(3000, () => {
    console.log("Listening on Port 3000")
})
