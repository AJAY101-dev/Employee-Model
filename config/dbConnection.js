const mongoose = require('mongoose');
// require('dotenv').config();

 const mongoDb = async () =>
 { 
    try {
        await mongoose.connect('mongodb+srv://admin:admin123@cluster0.20mxo.mongodb.net/');
        console.log(" connection done ")
        
    } catch (error) {
         console.log(` mongo db connection error ${error}`);
    }
 } 

  module.exports = mongoDb;