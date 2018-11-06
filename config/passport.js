const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const DB = require('../db');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await DB.findUserById(id);
    if(user){
      done(null, user);
    } else {
      done(null, false);
    }
  } catch(err){
    console.log(err);
  }
});

passport.use(new LocalStrategy(
  {
    usernameField: 'name',
    passwordField: 'password'
  },
  async (name, password, done) => {
    try {
      const params = { name, password };
      const id = await DB.checkUserCredentials(params);

      if(id){
        done(null, id);
      } else {
        done(null, false);
      }
    } catch(err){
      console.log(err);
    }
  }
));
