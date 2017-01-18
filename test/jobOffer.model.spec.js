// import the `mongoose` helper utilities
let utils = require('./utils');
import chai from 'chai';
let should = chai.should();
let util = require('util');
var mongoose = require('mongoose');

// import our `JobOffer` mongoose model
import JobOffer from '../app/models/jobOffer.model';
import Organization from '../app/models/organization.model';

describe('JobOffer: models', () => {

  describe('save()', () => {

    it('should create a Job Offer', (done) => {

      let orgData = {
        email: 'testing@gmail.com',
        password: 'pass',
        name: 'teste',
        profile: {
          nif: '501875745',
          hqLocality: 'Braga',
          orgType: 'Empresa',
          industryField: 'Calçado'
        },
        contacts : {
          website: 'myOrg.pt',
          address: 'Travessa central, 223',
          telephone: '224521456'
        }
      };

      let org = new Organization(orgData);

      org.save(function (err, newOrg) {
        // Confirm that that an error does not exist
        should.not.exist(err);

        let jobOfferData = {
          role : 'Engenheiro Informatico',
          organization: newOrg._id,
          description : 'O melhor do mundo',
          expirationDate : '2016-12-25',
          minimumQualifications : 'Não pode ser burro',
          local : 'Porto',
          skills : 'Sabe falar e escrever',
          benefits : '200€ e veterinário de graça'
        };
        let jobOffer = new JobOffer(jobOfferData);

        jobOffer.save(function (err, newJobOffer)  {
          // Confirm that that an error does not exist
          should.not.exist(err);
          newJobOffer.positionsAvailable.should.equal(1);
          newJobOffer.populate('organization',function (err, populatedOffer){
              should.not.exist(err);
              populatedOffer.organization.email.should.equal(newOrg.email);
              // Call done to tell mocha that we are done with this test
              done();
            });
        });
      });
   });
  });
});
