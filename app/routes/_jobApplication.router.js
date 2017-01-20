const User         = require('../models/user.model');
const Organization = require('../models/organization.model');
const JobOffer = require('../models/jobOffer.model');
const Hero = require('../models/hero.model');
const JobApplication = require('../models/jobApplication.model');

const util = require('util');
const RouterUtil = require('./util');

function sendCSV(res, dataOffer){
  var test = 'sep=|\n Nome | Email | Situação | Localização | Deficiencia | Carta de Motivação | Resumo | Competências \n';
  dataOffer.applications.forEach(function(value){
    test = test + value.hero.name + '|' +
                  value.hero.email + '|' +
                  value.hero.profile.situation + '|' +
                  value.hero.profile.location + '|' +
                  value.hero.profile.deficiency + '|' +
                  (value.extraRequest ? value.extraRequest : " ") + '|' +
                  (value.hero.profile.story ? value.hero.profile.story : " ") +  '|' +
                  (value.hero.profile.skills ? value.hero.profile.skills : " ")+ '|' + '\n';
  });

  res.set('Content-Type', 'text/csv');
  res.setHeader('Content-disposition', 'attachment; filename='+ dataOffer.role +'.csv');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires','0');
  res.status(200).send(test);
}

export default (app, router, passport) => {

  // List job applications of the Hero
  router.get('/heroes/jobApplications', passport.authenticate('jwt-login', {session: false}), RouterUtil.validateLogin, RouterUtil.mustBeHero,
    (req, res, next) => {
      const heroId = req.user._id;
      Hero.findById(heroId).populate({path: 'jobApplications', model: 'JobApplication', populate: {path: 'offer', model: 'JobOffer'}}).then(function(hero) {
        res.json(hero.jobApplications);
      });
    }, RouterUtil.errorHandler
  );

  // List a every job application for a job offer
  router.get('/jobOffers/:idJobOffer/jobApplications', passport.authenticate('jwt-login', {session: false}), RouterUtil.validateLogin, RouterUtil.mustBeOrganization,
    (req, res, next) => {
      const idJobOffer = req.params.idJobOffer;
      const idOrganization = req.user._id;
      JobOffer.findOne({_id: idJobOffer, organization: idOrganization}).populate({path: 'applications', model: 'JobApplication', populate: {path: 'hero', model: 'Hero'}})
        .then(function(jobOffer) {
          res.json(jobOffer.applications);
        })
    }, RouterUtil.errorHandler
  );

  // get all Job Applications for export
  router.get('/jobOffers/:idJobOffer/jobApplications/export',passport.authenticate('jwt-login', {session: false}), RouterUtil.validateLogin, RouterUtil.mustBeOrganization,
    (req, res, next) => {
      const idJobOffer = req.params.idJobOffer;
      const idOrganization = req.user._id;

      JobOffer.findOne({_id: idJobOffer, organization: idOrganization}).populate({path: 'applications', model: 'JobApplication', populate: {path: 'hero', model: 'Hero'}})
        .then(function(jobOffer) {
          sendCSV(res, jobOffer);
        })
    }, RouterUtil.errorHandler
  );

  // List a single job application for a hero
  router.get('/heroes/jobApplications/:idJobApplication',
    passport.authenticate('jwt-login', {session: false}), RouterUtil.validateLogin, RouterUtil.mustBeHero,
    (req, res, next) => {
      const heroId = req.user._id;
      const jobApplicationId = req.params.idJobApplication;
      JobApplication.findOne( {_id : jobApplicationId, hero : heroId}).populate({ path: 'offer', model: 'JobOffer', populate: {path: 'organization', model: 'Organization'
      }
      }).then( function (jobApplication){
        if (!jobApplication)
        {
          res.status(404);
          res.json({message : "Job Application not found."});
          return;
        }
        res.json(jobApplication);
      }).catch( function(err){
        next(err);
      });
    }, RouterUtil.errorHandler
  );

  // @TODO: error verifying
  router.post('/jobOffers/:idJobOffer/jobApplications', passport.authenticate('jwt-login', {session: false}), RouterUtil.validateLogin, RouterUtil.mustBeHero,
    (req, res, next) => {
      const idJobOffer = req.params.idJobOffer;
      const idHero = req.user._id;
      const extraRequest = req.body.extraRequest;
      const jobApplicationData = { hero: idHero, offer : idJobOffer , extraRequest : extraRequest }

      JobOffer.findById(idJobOffer).then( function(selectedJobOffer) {
          if(!selectedJobOffer){
            res.status(404).json({message : "Job Offer not found"});
            return Promise.reject('Job Offer not found');
          }
          if (selectedJobOffer.extraRequest && !jobApplicationData.extraRequest){
            res.status(400).json({message : "Extra Request missing"});
            return Promisse.reject('Extra Request missing');
          }

          return new JobApplication(jobApplicationData).save();
      }).then( function(createdJobApplication){
        return Promise.all([Hero.findByIdAndUpdate(idHero, {
          '$push' :{
            jobApplications : createdJobApplication._id
          }
        }), JobOffer.findByIdAndUpdate(idJobOffer, {
          '$push' : {
            applications: createdJobApplication._id
          }
        })]);
      }).then(function (results) {
          res.json({message: 'Job application submited'});
      }).catch(function (err) {
          console.error(err);
      });

    }, RouterUtil.errorHandler
  );

  // Delete an application of the Hero
  router.delete('/heroes/jobApplications/:idJobApplication', passport.authenticate('jwt-login', {session: false}), RouterUtil.validateLogin, RouterUtil.mustBeHero,
    (req, res, next) => {
      const idJobApplication = req.params.idJobApplication;
      const idHero = req.user._id;

      JobApplication.findOne({_id: idJobApplication, hero: idHero}).then(function(selectedJobApplication) {
        return selectedJobApplication.delete();
      }).then(function (deletedJobApplication) {
        res.json("Deleted Job Application.");
      });

    }, RouterUtil.errorHandler
  );
}
