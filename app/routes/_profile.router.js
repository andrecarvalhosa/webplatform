const User = require('../models/user.model');
const Hero = require('../models/hero.model');
const Organization = require('../models/organization.model');
const RouterUtil = require('./util');

export default (app, router, passport) => {
  // POST /api/my_profile
  router.route('/my_profile')

    .get(passport.authenticate('jwt-login', {session: false}),
      (req, res) => {
        if (!req.user) {
          res.status(401);
          res.json({message:"Credentials not valid"});
          return;
        }
        //console.log(JSON.stringify(req.user));
        res.json({user:req.user});
      })

    .post(passport.authenticate('jwt-login', {session: false}),
      (req, res) => {
        if (!req.user) {
          res.status(401);
          res.json({message:"Credentials not valid"});
          return;
        }

        if (req.user.__t == 'Hero') {
          if (req.body.email != '') req.user.email = req.body.email;
          if (req.body.password != '') req.user.password = req.user.generateHash(req.body.password);
          if (req.body.username != '') req.user.name = req.body.username;
          if (req.body.location != '') req.user.profile.location = req.body.location;
          if (req.body.deficiency != '') req.user.profile.deficiency = req.body.deficiency;
          if (req.body.situation != '') req.user.profile.situation = req.body.situation;
          if (req.body.certificate != '') req.user.profile.certificate = req.body.certificate;
          if (req.body.skills[0] != 'NaN') req.user.profile.skills = req.body.skills;

          req.user.save(function(err, updatedUser) {
            if (err) {
              console.log(err);
              res.status(500).end();
              return;
            }
            res.status(200).json({user: updatedUser});
          })
        }
        else {
          res.status(400).json({err: 'Function not supported'});
        }
      });

  router.get('/heroes', passport.authenticate('jwt-login', {session: false}), RouterUtil.validateLogin,
    function(req, res, next) {
      let query;
      if (req.query.query) {
        query = req.query.query;
      } else {
        query = '';
      }
      //JobOffer.find({ role : new RegExp('.*' + query + '.*', "i")}).populate({path: 'organization', model: 'Organization'}).then(function(jobOffers, err) {
      Hero.find({ 'profile.deficiency' : new RegExp('.*' + query + '.*', "i")}).then(function(heroes, err) {
        res.json(heroes);
      })
    }, RouterUtil.errorHandler
  );

  router.get('/heroes/:heroId', passport.authenticate('jwt-login', {session: false}), RouterUtil.validateLogin,
    function(req, res, next) {
      const heroId = req.params.heroId;
      Hero.findById(heroId).then(function(hero) {
        res.json(hero);
      })
    }, RouterUtil.errorHandler
  );


  router.get('/organizations', passport.authenticate('jwt-login', {session: false}), RouterUtil.validateLogin,
    function(req, res, next) {
      let query;
      if (req.query.query) {
        query = req.query.query;
      } else {
        query = '';
      }
      //JobOffer.find({ role : new RegExp('.*' + query + '.*', "i")}).populate({path: 'organization', model: 'Organization'}).then(function(jobOffers, err) {
      Organization.find({ name : new RegExp('.*' + query + '.*', "i")}).then(function(organizations, err) {
        res.json(organizations);
      })
    }, RouterUtil.errorHandler
  );

  router.get('/organizations/:orgId', passport.authenticate('jwt-login', {session: false}), RouterUtil.validateLogin,
    function(req, res, next) {
      const orgId = req.params.orgId;
      Organization.findById(orgId).then(function(organization) {
        res.json(organization);
      })
    }, RouterUtil.errorHandler
  );
}
