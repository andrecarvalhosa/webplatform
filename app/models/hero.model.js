var mongoose  = require('mongoose');
var User      = require('./user.model.js');
var options   = {discriminatoryKey : 'kind'};

var heroSchema = mongoose.Schema({
   profile : {
    certificate : { type: String},
    deficiency : { type: String, required: true},
    story : { type: String,default: ''},
    situation : { type: String, required: true},
    dateOfBirth : { type: Date},
    photo : { type : String},
    location : { type: String, required: true},
    skills : []
  },
  jobApplications :[
    {type : mongoose.Schema.Types.ObjectId, ref: 'jobApplication',required : true}
  ]

}, options);

module.exports = User.discriminator('Hero', heroSchema);
