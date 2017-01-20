// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
const util = require('util');

// load up the user model
var User       = require('../app/models/user.model');
var Organization = require('../app/models/organization.model');
var Hero = require('../app/models/hero.model');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(passport) {

  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromExtractors([function(req) {
    var token = null;
    if (req && req.headers && req.headers.authorization && req.headers.authorization.startsWith('JWT ')) {
      token = req.headers.authorization.replace('JWT ', '');
    }
    // console.log('JWT:' + token);

    return token;
  }]);
  opts.secretOrKey = 'SECRET';

  passport.use('jwt-login', new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload._id, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // LOCAL LOGIN =============================================================
  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },function(req, email, password, done) {

      (function (password) {
      User.findOne({ 'email' :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err){
          return done(err);
        }
        if (!user || !user.validPassword(password)) {
          return done(null, false);
        }

        user.jwt = user.generateJWT();

        user.save(function (err, updatedUser) {
          if (err) return done(err);
          return done(null, updatedUser);
        });
      });
    })(password)
    }));

  // LOCAL SIGNUP ============================================================
  passport.use('local-signup-org', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      session : false
    },
    function(req, email, password, done) {

      if (email)
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

      // asynchronous
      process.nextTick(function () {
        if (!req.user) {
          var newOrg = new Organization();

          newOrg.email = email;
          newOrg.password = newOrg.generateHash(password);
          newOrg.name = req.body.name;
          //TODO JWT poderá ser gerado aqui
          newOrg.profile.nif = req.body.nif;
          //TODO verificar se o NIF é válido

          /*
           if (!req.files) {
           res.send("Nenhum logo foi carregado!");
           //TODO acrescentar logo template (?)
           }
           var photo = req.files.photo;
           photo.mv('public/images/' + photo.name, function(err){
           if (err)
           return done(err);

           newOrg.profile.logo = photo.name;
           });
           });
           */

          newOrg.profile.hqLocality = req.body.hqLocality;
          newOrg.profile.orgType = req.body.orgType;
          newOrg.profile.industryField = req.body.industryField;
          /*
           newOrg.contacts.website = req.body.website;
           newOrg.contacts.address = req.body.address;
           newOrg.contacts.telephone = req.body.telephone;
           newOrg.contacts.fax = req.body.fax;
           */

          newOrg.save(function (err, createdOrg) {
            console.log(util.inspect(err));
            console.log(util.inspect(createdOrg));
            if (err)
              return done(err);

            return done(null, createdOrg);
          });
        }
      });
    }));

  passport.use('local-signup-hero', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      session : false
    },
    function(req, email, password, done) {

      if (email)
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

      // asynchronous
      process.nextTick(function () {
        if (!req.user) {
          var newHero = new Hero();

          newHero.email = email;
          newHero.password = newHero.generateHash(password);
          newHero.name = req.body.name;
          newHero.profile.deficiency = req.body.deficiency;
          newHero.profile.situation = req.body.situation;
          newHero.profile.location = req.body.location;

          /*
           if(!req.files){

           res.send("Nenhum ficheiro foi carregado!");
           return;
           }
           var photo = req.files.photo;
           photo.mv('public/images/' + photo.name, function(err){
           if (err)
           return done(err);
           newHero.profile.photo = photo.name;
           */

          newHero.save(function (err, createdHero) {
            if (err)
              return done(err);

            return done(null, createdHero);
          });
        }
      });
    }));
};
