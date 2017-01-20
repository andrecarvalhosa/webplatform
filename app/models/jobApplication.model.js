var mongoose = require('mongoose');
const Hero = require('./hero.model');
const JobOffer = require('./jobOffer.model');

var jobApplicationSchema = mongoose.Schema({
  hero : { type : mongoose.Schema.Types.ObjectId, ref: 'Hero',required : true},
  offer: { type : mongoose.Schema.Types.ObjectId, ref: 'JobOffer',required : true},
  creationDate : {type: Date, default: Date.now},
  extraRequest : { type : String},
});

jobApplicationSchema.index( {hero: 1, offer: 1}, {unique : true});

jobApplicationSchema.methods.delete = function() {
  const selectedApplication = this;

  return Promise.all([Hero.findByIdAndUpdate(selectedApplication.hero, {
    '$pull' :{
      jobApplications : selectedApplication._id
    }
  }), JobOffer.findByIdAndUpdate(selectedApplication.offer, {
    '$pull' : {
      applications: selectedApplication._id
    }
  })]).then(function(res) {
    selectedApplication.remove();
  });
};

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
