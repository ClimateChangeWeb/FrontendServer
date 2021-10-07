const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const signupFunc = require('./controllers/signup');
const editUser = require('./controllers/edit-user');
const { ensureLoggedOut } = require('connect-ensure-login');
const morgan = require('morgan');
var fs = require('fs');
const axios = require('axios');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});
router.use(morgan('combined', { stream: accessLogStream }));
router.use(morgan('tiny'));
morgan.token('host', function (req, res) {
  return req.hostname;
});

//login endpoint
router.post('/login', (req, res, next) => {
  //authenticate with password mongoose local strategies
  passport.authenticate('local', (err, user, info) => {
    //user will be false if any err
    console.log('the user is:');
    console.log(user);
    //return err
    if (err) {
      return next(err);
    }
    /**
     * check for user info
     * should also do in front end
     */
    if (!user) {
      console.log(`info is ${info.message}`);
      res.status(400).json(info);
    }
    /**
     * login
     */
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      // back to homepage
      return res.status(200).send(user);
    });
  })(req, res, next);
});

/**
 * get the user info from the login form
 */
router.get('/login', ensureLoggedOut(), (req, res) => {
  res.sendFile(path.resolve('views/login.html'));
});

router.get('/logout', function (req, res) {
  /**
   * logout function
   */
  req.logout();
  //redirect to login endpoint
  res.redirect('/login');
});

//signup endpoint
router.post('/signup', (req, res, next) => {
  /**
   * the error check should also be done in the front end
   * but we still need backend error check
   */
  //check if the input empty
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    console.log('Object missing');
    const err = new Error('Bad request, No information provided');
    err.status = 400;
    return next(err);
  }

  //check if the information is provided in the backend side.
  console.log('signupFunc called');
  signupFunc(req, res, next);
});

// signup page
router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.sendFile(path.join(__dirname, '/views/signup.html'));
});

// frontend get user info
router.get('/user', (req, res) => res.send({ user: req.user }));

//edit user
router.patch('/user', editUser);

// get discover news
const discoverURL =
  'https://us-south.functions.appdomain.cloud/api/v1/web/21aa5286-66d7-41a8-b547-3e067029a6bc/default/getDicoverNews';
router.get('/discovers', (req, res) => {
  axios
    .get(discoverURL)
    .then(function (response) {
      // handle success
      console.log(response.data.result);
      res.json(response.data.result);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

// get warnings url
const warningsURL =
  'https://climate-change-backend.us-south.cf.appdomain.cloud/warning';
router.get('/warnings', (req, res) => {
  axios
    .get(warningsURL)
    .then(function (response) {
      // handle success
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

// get the weather url
const weatherURL =
  'https://climate-change-backend.us-south.cf.appdomain.cloud/weatherForecast';
router.get('/weather', (req, res) => {
  //TODO: get the city from frontend for the weather.
  axios
    .get(weatherURL)
    .then(function (response) {
      // handle success
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

// get the charities URL
const charitiesURL =
  'https://us-south.functions.appdomain.cloud/api/v1/web/21aa5286-66d7-41a8-b547-3e067029a6bc/default/getCharities';
router.get('/charities', (req, res) => {
  axios
    .get(charitiesURL)
    .then(function (response) {
      // handle success
      res.json(response.data.result);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

// discover page
router.get('/discover', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/discover.html'));
});

// charity page
router.get('/charity', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/charity.html'));
});

module.exports = router;
