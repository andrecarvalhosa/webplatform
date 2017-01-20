var mongoose = require('mongoose');
var Organization = require('./organization.model');

var jobOfferSchema = mongoose.Schema({
  role : {type : String, required: true},
  organization: { type : mongoose.Schema.Types.ObjectId, ref: 'Organization',required : true},
  description : {type : String, required : true},
  creationDate : {type: Date, default: Date.now},
  expirationDate : { type : Date, required : true},
  minimumQualifications : { type : String, required : true},
  local : { type : String, required : true},
  skills : { type : String, required : true},
  benefits : { type : String},
  candidatesLimit : { type : String},
  extraRequest : { type : String },
  applications : [
    { type : mongoose.Schema.Types.ObjectId, ref: 'JobApplication',required : true}
  ],
  cancellationMotive : { type : String },
  positionsAvailable : { type: Number, default : 1}
});

jobOfferSchema.statics.getOrganizationWithJobOffer = function (id) {
  return Organization.findById(id).populate({
    path: 'jobOffers',
    model: 'JobOffer'
  });
};


module.exports = mongoose.model('JobOffer', jobOfferSchema);
