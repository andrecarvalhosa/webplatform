var User         = require('../models/user.model');

const util = require('util');

export default (app, router, passport) => {

  ///////////////////////////////////////////////////////////////// DUMMY
  /*router.post('/test',(req, res, next) => {
    var dummyUser       = new User();
    dummyUser.email     = "teste@gmail.com";
    dummyUser.password  = dummyUser.generateHash("teste");
    dummyUser.name      = "teste";
    dummyUser.jwt       = '';

    console.log(JSON.stringify(dummyUser));
    console.log("DUMMY INSIRT");

    // save the user
    dummyUser.save(function(err) {
      if (err) throw err;
      console.log('User created!');
    })
  });*/
   ///////////////////////////////////////////////////////////////// END DUMMY

  router.post('/isLoggedIn', passport.authenticate('jwt-login', {session: false}),
    (req, res) => {
      if (!req.user) {
        res.status(401);
        res.json({message:"Credentials not valid"});
        return;
      }
      //console.log(JSON.stringify(req.user));
      res.json({jwt:req.user.jwt});
    }
  );
  router.post('/logout', passport.authenticate('jwt-login', {session: false}),
    (req, res) => {
      if (req.user) {
        req.user.jwt = null;
      }
      req.user.save(function(err) {
        res.status(200);
        res.json({message:"Successful logout"});
      })
    }
  );

  // POST /api/login
  router.post('/login', (req, res, next) => {

    passport.authenticate('local-login', (err, user) => {

      if (err){
        return next(err);
      }
      // If no user is returned...

      res.setHeader('Content-Type', 'application/json');
      if (!user) {
        res.status(401);
        res.json({message:"Credentials not valid"});
        return;
      }
      let redirectTo = '/#/profile';
      if (user.__t == 'Organization') {
        redirectTo = '/#/organizationProfile/'
      }
      res.send(JSON.stringify({jwt:user.jwt, redirectTo: redirectTo}));

    }) (req, res, next);
  });

  // POST /api/signupOrg
  router.post('/signupOrg', passport.authenticate('local-signup-org'),

    (req, res) => {

        if (req.user) {
          res.json(req.user);
        }
        else {
          res.send(400);
        }
    }
  );

  // POST /api/signupHero
  router.post('/signupHero',passport.authenticate('local-signup-hero'),

    (req, res) => {

      if (req.user) {
        res.json(req.user);
      }
      else {
        res.send(400);
      }
    }
  );

  // POST /api/signup
  router.post('/signup',(req, res, next) => {

    res.send("/api/signup well mapped");
    return;
  });

}
