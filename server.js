require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const photosRoute = require('./routes/api/photos');

//use bodyparser
app.use(bodyParser.json());
//use cors
app.use(cors());

//connect to MongoDB
mongoose.connect(process.env.mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then(()=> console.log('MongoDB Connected'))
.catch((err) => console.log(err));

app.use('/api/photos', photosRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is starting at PORT ${PORT}`);
})