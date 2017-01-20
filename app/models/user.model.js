var mongoose  = require('mongoose');
var bcrypt    = require('bcrypt-nodejs');
var jwt       = require('jsonwebtoken');
var options   = {discriminatoryKey : 'kind'};

// define the schema for our user model
var userSchema = new mongoose.Schema({
    email               : {type : String, required: true, unique: true},
    password            : {type : String, required: true},
    name                : {type : String, required: true},
    jwt                 : {type : String}, // Authentication token (for the API)
    accountCreationDate : {type: Date, default: Date.now}
  }, options);

//========================================================== generating webtoken
userSchema.methods.generateJWT = function() {
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({_id      : this._id,
                   username : this.username,
                   exp      : parseInt(exp.getTime() / 1000),},
                  'SECRET');
};

////========================================================== generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

////============================================== checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
