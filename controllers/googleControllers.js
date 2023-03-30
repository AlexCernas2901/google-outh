const passport = require('passport');

const authenticate = passport.authenticate('google', { 
    scope: ['profile', 'email'] 
});

const callback = passport.authenticate('google', {
  successRedirect: '/auth/dashboard',
  failureRedirect: '/'
}); 

module.exports = {
    callback,
    authenticate,
};