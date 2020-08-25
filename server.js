require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const registerRoute = require('./routes/api/register');
const photosRoute = require('./routes/api/photos');
const loginRoute = require('./routes/api/login');
const userRoute = require('./routes/api/user');
const commentRoute = require('./routes/api/comments');

//use bodyparser
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

//use cors
app.use(cors());

//connect to MongoDB
mongoose.connect(process.env.mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then(()=> console.log('MongoDB Connected'))
.catch((err) => console.log(err));


app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/user', userRoute);
app.use('/api/photos', photosRoute);
app.use('/api/photos/:id/comments', commentRoute)


//serve static assets if we are in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is starting at PORT ${PORT}`);
})