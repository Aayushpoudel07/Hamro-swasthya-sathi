const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrupt = require('bcrupts');
const {users} = require('../models');

passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // Use email for the login form's username
        passwordField: 'password', // Use password for the login form's password
      },
      async (email, password, done) => {
        try {
          const user = await Users.findOne({ where: { email } }); // Find user by email
          if (!user) {
            return done(null, false, { message: 'Invalid email or password' }); // No user found
          }
  
          // Compare the password with the hashed password stored in the DB
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: 'Invalid email or password' }); // Incorrect password
          }
  
          return done(null, user); // Successful login
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  // Serialize the user into the session
  passport.serializeUser((user, done) => {
    done(null, user.id); // Storing user ID in session
  });
  
  // Deserialize user from the session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Users.findByPk(id); // Find user by ID from session
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  
  module.exports = passport;