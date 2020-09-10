const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT

// connection to MongoDB
const url = process.env.DATABASE_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log("MongoDB connected");
}).catch((error) => {
  console.log("unable to connect MongoDB");
  console.log(error);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const indexRouter = require('./routes/index');
const users = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', users);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

module.exports = app;