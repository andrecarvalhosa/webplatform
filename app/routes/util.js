const util = require('util');

module.exports.validateLogin = function(req, res, next){
  if (!req.user){
    res.status(401);
    res.json({message:"Credentials not valid"});
    return;
  }
  next();
};

module.exports.mustBeOrganization = function(req, res, next){
  if (req.user.__t != 'Organization') {
    res.status(401);
    res.json({ message: "Account is not an Organization"});
    return;
  }
  next();
};

module.exports.mustBeHero = function(req, res, next){
  if (req.user.__t != 'Hero') {
    res.status(401);
    res.json({ message: "Account is not a Hero"});
    return;
  }
  next();
};

module.exports.errorHandler = function(err, req, res, next){
  console.error(err);
  res.status(500);
};
