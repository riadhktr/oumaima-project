const express = require("express")
const connect = require("./config/connect")
const foodRouter = require('./routes/foodRoutes');
const UserRouter = require('./routes/userRoutes')
var bodyParser = require('body-parser');
const app = express()
require("dotenv").config()
const port = process.env.PORT
connect()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true })); //importation mta3 data apartir formulaire

app.use('/public',express.static("public")) //fi dossier public mawjoud kol chay sta

app.use('/food',foodRouter)
app.use('/api',UserRouter)

app.listen(port,(err)=>{
  if (err){
    console.log(err);
  }
  console.log(`server run in : ${port}`)
})




















