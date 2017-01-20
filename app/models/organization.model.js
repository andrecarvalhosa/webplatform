var mongoose  = require('mongoose');
var User      = require('./user.model.js');
var options   = {discriminatoryKey : 'kind'};

var orgSchema = mongoose.Schema({
   profile : {
    nif : { type: String, required: true},
    logo : { type : String }, // Might not be required, because the organization might not have one
    hqLocality : { type: String, required: true}, // Geographic locality of the Organization
    orgType : {type: String, required: true}, // type of Company (as in, association, public or private company, etc)
    industryField : {type: String, required: true},  // Industry field
    description: {type: String}
  },
  contacts : {
    website : { type: String, default: ''}, 
    address: { type: String},
    telephone: { type: Number},
    fax: {type: Number}
  },
  jobOffers :[
      {type : mongoose.Schema.Types.ObjectId, ref: 'JobOffer',required : true}
  ],
}, options);

module.exports = User.discriminator('Organization', orgSchema);
