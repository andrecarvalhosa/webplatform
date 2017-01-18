var User         = require('../models/user.model');
const Organization = require('../models/organization.model');
const JobOffer = require('../models/jobOffer.model');
const JobApplication = require('../models/jobApplication.model');

const util = require('util');
const routerUtil = require('./util');

export default (app, router, passport) => {

  // Create a job offer
  router.post('/organizations/jobOffers', passport.authenticate('jwt-login', {session: false}), routerUtil.validateLogin, routerUtil.mustBeOrganization,
    (req, res, next) => {
      const neededParams = ['role', 'description', 'expirationDate', 'minimumQualifications', 'local', 'skills'];
      const optionalParams = ['benefits', 'candidatesLimit', 'extraRequest', 'positionsAvailable'];
      let missingParams = [];
      neededParams.forEach(function(param) {
        if (!req.body[param]){
          missingParams.push(param);
        }
      });

      if (missingParams.length) {
        res.status(400);
        res.json({err: 'Missing Params: ' + missingParams.join()});
        return;
      }

      let jobOfferData = {};
      neededParams.forEach(function(param) {
        jobOfferData[param] = req.body[param];
      });

      optionalParams.forEach(function (param){
        if (req.body[param]){
          jobOfferData[param] = req.body[param];
        }
      });

      jobOfferData['organization'] = req.user._id;

      let jobOffer = new JobOffer(jobOfferData);

      jobOffer.save()
        .then(function (newJobOffer) {
          Organization.findById(req.user._id)
            .then(function (org) {
              org.jobOffers.push(newJobOffer._id);
              return org.save();
            })
        })
        .then(function(org) {
          res.status(200);
          res.json({message : "Job Offer created."});
        });
    }, routerUtil.errorHandler
  );

  // List every job offer the organization has
  router.get('/organizations/jobOffers', passport.authenticate('jwt-login', {session: false}), routerUtil.validateLogin, routerUtil.mustBeOrganization,
    (req, res, next) => {
      JobOffer.getOrganizationWithJobOffer(req.user._id).then(function (org){
        res.json(org.jobOffers);
      });
    }, routerUtil.errorHandler
  );

  // List every job offer a certain organization
  router.get('/organizations/:idOrganization/jobOffers', passport.authenticate('jwt-login', {session: false}), routerUtil.validateLogin,
    (req, res, next) => {
      JobOffer.getOrganizationWithJobOffer(req.params.idOrganization).then(function (populatedOffer) {
          res.json(populatedOffer.jobOffers);
        });

    }, routerUtil.errorHandler
  );

  // List every job offer with a certain parameter
  router.get('/organizations/jobOffers/:parameter', passport.authenticate('jwt-login', {session: false}), routerUtil.validateLogin,
    (req, res, next) => {
    console.log(req.params.parameter);
      JobOffer.find({ role : new RegExp('.*' + req.params.parameter + '.*', "i")}).then(function(person){
        res.json(person);
      });
    }, routerUtil.errorHandler
  );

  // List every job offer created in the system (if the query is empty, otherwise will list according to a parameter given)
  router.get('/jobOffers', passport.authenticate('jwt-login', {session: false}), routerUtil.validateLogin,
    (req, res, next) => {
      let query;
      if (req.query.query) {
        query = req.query.query;
      } else {
        query = '';
      }
      JobOffer.find({ role : new RegExp('.*' + query + '.*', "i")}).populate({path: 'organization', model: 'Organization'}).then(function(jobOffers, err) {
        res.json(jobOffers);
      });
    }, routerUtil.errorHandler
  );

  // Show a specific job offer
  router.get('/jobOffers/:idJobOffer', passport.authenticate('jwt-login', {session: false}), routerUtil.validateLogin,
    (req, res, next) => {
      const idJobOffer = req.params.idJobOffer;
      JobOffer.findById(idJobOffer)
        .populate({path: 'organization', model: 'Organization'})
        .populate({path: 'applications', model: 'JobApplication', populate: {path: 'hero', model: 'Hero'}})
        .then(function(jobOffer, err) {
        res.json(jobOffer);
      });

    }, routerUtil.errorHandler
  );

  // Delete a job offer
  router.delete('/organizations/jobOffers/:idJobOffer', passport.authenticate('jwt-login', {session: false}), routerUtil.validateLogin, routerUtil.mustBeOrganization,
    (req, res, next) =>{
        const idJobOffer = req.params.idJobOffer;
        const idOrg = req.user._id;

        JobOffer.findOne({_id:idJobOffer, organization: idOrg})
          .then(function (selectedJobOffer, err){
            if (err) {
              next(err);
              return Promise.reject('Server error');
            }
            if (!selectedJobOffer) {
              res.status(404);
              res.json({message : "Job Offer not found."});
              return Promise.reject('Job Offer not Found');
            }

            return Promise.all(selectedJobOffer.applications.map(function(applicationId) {
                return JobApplication.findById(applicationId).then(function(aplication) {
                  return aplication.delete();
                })
            })).then(function(res) {
                return Organization.findByIdAndUpdate(selectedJobOffer.organization, {
                  '$pull': {
                    'jobOffers': selectedJobOffer._id
                  }
                });
              }).then(function (updatedOrg) {
                selectedJobOffer.remove();
            });
          }).then( function (deletedOffer){
          res.json({message: "Job Offer deleted."});
        }).catch( function(err) {
          console.error(err);
        })
    }, routerUtil.errorHandler
  );
}
