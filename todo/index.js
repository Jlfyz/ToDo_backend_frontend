const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
//Import Routes
const authRoute = require('./routes/auth');
const noteRoute = require('./routes/notes');

//Init env variables
dotenv.config();
//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, 
    () => console.log('connected to db!')
);

//Middleware
app.use(express.json());
app.use(cors());
//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/notes', noteRoute);

app.listen(3000, () => console.log('Server is runing'))