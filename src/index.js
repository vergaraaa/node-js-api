const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

// express app
const app = express();

// load env variables
require('dotenv').config({ path: __dirname + '/../.env' });

// db connection
require('../src/database/config.js');

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public path
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use('/api/auth', require('./routes/auth.routes'));


// listen 
app.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);

    console.log(`server on port: ${process.env.PORT}`)
});