const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const assetRoutes = require('./routes/assets-route');
const app = express();

const DB_URI = `mongodb+srv://${process.env.MONGOOSE_URI_USERNAME}:${
  process.env.MONGOOSE_URI_PASSWORD
  }@${process.env.MONGO_URI}/${process.env.MONGOOSE_URI_DB}?retryWrites=true`;
mongoose
  .connect(
    DB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log('Connection failed!', err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/asset', assetRoutes);
module.exports = app;
