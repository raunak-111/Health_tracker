const express = require('express')
const app = express(); 
const db = require("./db")
const bodyParser  = require("body-parser")
app.use(bodyParser.json());

const userRouter  = require('./routers/userRouter');
const healthRecordRouter  = require('./routers/healthRecordRouter');

app.use("/user",  userRouter);
app.use("/health-records", healthRecordRouter);


app.listen(process.env.PORT || 3000 , ()=>console.log("sever is live on port 3000"));