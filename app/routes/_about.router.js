var User = require('../models/user.model');

export default (app, router, passport) => {
  // POST /api/my_about
  router.route('/my_about')

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
          if (!req.body.hasOwnProperty('about')){
            res.status(400);
            res.json({message:"About empty"});
            return;
          }
            req.user.profile.story = req.body.about;

          req.user.save(function(err, updatedUser) {
            if (err) {
              console.log(err);
              res.status(500).end();
              return;
            }
            res.status(200).json({user: updatedUser});
          })
        }
        else if (req.user.__t == 'Organization') {
          if (!req.body.hasOwnProperty('description')){
            res.status(400);
            res.json({message:"About empty"});
            return;
          }

          req.user.profile.description = req.body.description;

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


      User.findById('101202303404505606707808',function(err,user){
        if (err) {
          console.log(err);
          res.status(500).json({err: 'Something went wrong'});
          return;
        }
        if (!user){
          res.status(404).json({err: 'User not found.'});
          return;
        }

        res.status(200).json({user: user});

      });

    });
}
