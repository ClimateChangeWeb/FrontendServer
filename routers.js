const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const signupFunc = require('./controllers/signup');
const connectEnsureLogin = require('connect-ensure-login');
const morgan = require('morgan');
var fs = require('fs');

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
      res.status(400).send(info);
    }
    /**
     * login
     */
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      // back to homepage
      return res.status(200).redirect('/');
    });
  })(req, res, next);
});

/**
 * get the user info from the login form
 */
router.get('/login', (req, res) => {
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

// frontend get user info
router.get('/user', (req, res) => res.send({ user: req.user }));

module.exports = router;
