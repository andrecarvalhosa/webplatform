var User = require('../models/user.model');

export default (app, router, passport) => {
  // POST /api/my_skills
  router.route('/my_skills')

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
          if (!req.body.skills) {
            res.status(400);
            res.json({message:"skills parameter missing"});
            return;
          }

          req.user.profile.skills = req.body.skills;

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
}
