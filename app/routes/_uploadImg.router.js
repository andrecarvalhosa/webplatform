var User = require('../models/user.model');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/assets/img/profile/')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  }
});

var upload = multer({ storage: storage });


export default (app, router, passport) => {
  // POST /api/upload_img
  router.route('/upload_img')

    .post(upload.single('img'),passport.authenticate('jwt-login', {session: false}),
      (req, res) => {
        if (!req.user) {
          res.status(401);
          res.json({message:"Credentials not valid"});
          return;
        }

        if (req.user.__t == 'Hero') {
          req.user.profile.photo = req.file.filename;

          req.user.save(function(err, updatedUser) {
            if (err) {
              console.log(err);
              res.status(500).end();
              return;
            }
            res.status(200).json({user: updatedUser});
          })
        }else if (req.user.__t == 'Organization') {
          req.user.profile.logo = req.file.filename;

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
