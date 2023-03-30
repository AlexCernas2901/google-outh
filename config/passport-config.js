const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../database/database');

passport.use(new GoogleStrategy({
    clientID: "703207294122-8nve1glg81eft1tndk2ohrlahj33mt80.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {
    const user = {
      google_id: profile.id,
      display_name: profile.displayName,
      email: profile.emails[0].value
    };
    
    req.session.user = user;

    db.query(`SELECT * FROM users WHERE google_id = ?`, [user.google_id], (err, result) => {
      if (err) throw err;
  
      if (result.length === 0) {
        sql = 'INSERT INTO users SET ?';
        db.query(sql, user, (err) => {
          if (err) throw err;
  
          return done(null, user);
        });
      } else {
        return done(null, result[0]);
      }
    });
  }));
  
passport.serializeUser((user, done) => {
  done(null, user.google_id);
});

passport.deserializeUser((id, done) => {  
  db.query(`SELECT * FROM users WHERE google_id = ?`, [id], (err, result) => {
    if (err) throw err;
  
    done(null, result[0]);
  });
});

module.exports = passport;