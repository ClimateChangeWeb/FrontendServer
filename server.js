const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routers');
const socket = require('./sockets');
const passport = require('passport');
const adminRouter = require('./adminRouter');
const expressSession = require('express-session')({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }, //1 hour
});
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

socket.openSocket(io);

//get the admin portal
app.use('/admin', adminRouter);

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//store section
app.use(expressSession);

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/views'));

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

//connect to database
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', function () {
  // we're connected!
  console.log('database connected');
});

//get routes
app.use(routes);

//error handler middleware
app.use(function (err, req, res, next) {
  //can send error message to the front end but stay in the signup endpoint
  res.status(err.status || 500);
  //need a view engine
  // res.render('error', {
  //   message: err.message,
  //   error: {},
  // });
  console.log(`error message is ${err.message}`);
});

httpServer.listen(PORT, () => {
  console.log(`Server start at PORT ${PORT}`);
});
