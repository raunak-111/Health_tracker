const mongoose  = require("mongoose")
require("dotenv").config();
const mongoURL  = process.env.MONGODB_URL
// const mongoURL = process.env.MONGODB_URL_LOCAL

mongoose.connect(mongoURL  , {
    // useNewUrlParser: true,
    // useUnifiedTopology  :true
})


//creating a object which take care of opration in mongoDB

const db = mongoose.connection;

// events

db.on('connected' , ()=>{
    console.log("connected to mongodb sever")
})

db.on('disconnected' , ()=>{
    console.log("disconnected to mongodb sever")
})

db.on('error' , ()=>{
    console.log("error to connect with mongodb sever")
})


module.exports = db;