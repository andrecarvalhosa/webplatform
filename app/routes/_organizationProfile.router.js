var User = require('../models/user.model');

const util=require('util');
const RouterUtil = require('./util');

export default (app, router, passport) => {
  // POST /api/my_organizationProfile
  router.route('/my_organizationProfile')

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

        if (req.user.__t == 'Organization') {
          if (req.body.name != '') req.user.name = req.body.name;
          if (req.body.password != '') req.user.password = req.user.generateHash(req.body.password);
          if (req.body.nif != '') req.user.profile.nif = req.body.nif;
          if (req.body.location != '') req.user.profile.hqLocality = req.body.location;
          if (req.body.type != '') req.user.profile.orgType = req.body.type;
          if (req.body.field != '') req.user.profile.industryField = req.body.field;
          if (req.body.website != '') req.user.contacts.website = req.body.website;
          if (req.body.address != '') req.user.contacts.address = req.body.address;
          if (req.body.telephone != '') req.user.contacts.telephone = req.body.telephone;
          if (req.body.mail != '') req.user.email = req.body.mail;
          if (req.body.fax != '') req.user.contacts.fax = req.body.fax;

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

  router.route('/user')
    .get((req,res) => {
      if (!req.query.user_id){
        res.status(400).json({err: 'user_id parameter missing.'});
        return;
      }

    });

  router.get('/orgs/:orgId', passport.authenticate('jwt-login', {session: false}), RouterUtil.validateLogin,
    function(req, res, next) {
      const orgId = req.params.orgId;
      console.log(orgId);
      User.findById(orgId).then(function(org) {
        res.json(org);
      })
    }, RouterUtil.errorHandler
  );

}
