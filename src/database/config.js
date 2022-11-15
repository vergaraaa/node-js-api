const mongoose = require('mongoose');

require('dotenv').config({ path: __dirname + '/../.env' });

try {
    mongoose.connect(process.env.DB_CCN);
    console.log('db connected');
} catch (error) {
    console.log(error);
    throw new Error('Error in databse - speak to admin!');
}