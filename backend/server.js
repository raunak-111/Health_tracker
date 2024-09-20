const express = require('express')
const app = express(); 
const db = require("./db")
const bodyParser  = require("body-parser")
app.use(bodyParser.json());



app.listen(process.env.PORT || 3000 , ()=>console.log("sever is live on port 3000"));