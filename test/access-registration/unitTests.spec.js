// import the `mongoose` helper utilities
let utils = require('../utils');
import chai from 'chai';
let should = chai.should();
let expect = chai.expect;
let util = require('util');

import User from '../../app/models/user.model';
import Hero from '../../app/models/hero.model';
import Organization from '../../app/models/organization.model';

describe('ACCESS AND REGISTRATION: UNIT TESTS ************************', () => {

  it('should create a new User', (done) => {

    let userData = {email: 'testing@gmail.com', password: 'pass', name: 'teste'};
    let user = new User(userData);

    user.save((err) => {
      // Confirm that that an error does not exist
      should.not.exist(err);

      user.email.should.equal(userData.email);
      user.password.should.equal(userData.password);
      user.name.should.equal(userData.name);

      // Call done to tell mocha that we are done with this test
      done();
    });
  });

  it('should not allow the creation of an user with the same email', (done) => {

    let sameEmail = 'sameEmail@gmail.com'
    let user1Data = {email: sameEmail, password: 'pass1', name: 'teste1'};
    let user2Data = {email: sameEmail, password: 'pass2', name: 'teste2'};
    let user1 = new User(user1Data);

    user1.save((err) => {
      should.not.exist(err)
    });

    let user2 = new User(user2Data);
    user2.save((err) => {
      should.exist(err);
      done();
    });

  });

  it('should create a User of kind Hero', (done) => {

    let heroData = {
      email: 'testing@gmail.com',
      password: 'pass',
      name: 'teste',
      profile: {
        deficiency: 'Cegueira',
        situation: 'Desempregado',
        location: 'Porto'
      }
    };

    let hero = new Hero(heroData);

    hero.save((err) => {
      // Confirm that that an error does not exist
      should.not.exist(err);

      hero.__t.should.equal('Hero');

      // Call done to tell mocha that we are done with this test
      done();
    });
  });

  it('should create a User of kind Organization', (done) => {

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

    org.save((err) => {
      // Confirm that that an error does not exist
      should.not.exist(err);

      org.__t.should.equal('Organization');
      org.jobOffers.should.be.empty;

      // Call done to tell mocha that we are done with this test
      done();
    });
  });

  it('should create Heroes and Organizations as Users', (done) => {
    let heroData = {
      email: 'testingHero@gmail.com',
      password: 'pass',
      name: 'testeHero',
      profile: {
        deficiency: 'Cegueira',
        situation: 'Desempregado',
        location: 'Porto',
        skills: 'Musica classica'
      }
    };

    let hero = new Hero(heroData);

    let orgData = {
      email: 'testingOrg@gmail.com',
      password: 'pass',
      name: 'testeOrg',
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


    hero.save((err) => {
      org.save((err) => {
        User.count({}, (err, count) => {
          should.not.exist(err);
          count.should.equal(2);
          done();
        })
      });
    });
  });

  it('should generate unique JWT', (done) => {
      let user1Data = {email: 'mail@gmail.com', password: 'pass1', name: 'teste1'};
      let user2Data = {email: 'mail2@gmail.com', password: 'pass2', name: 'teste2'};
      let user1 = new User(user1Data);
      let user2 = new User(user2Data);

      user1.jwt = user1.generateJWT();
      user2.jwt = user2.generateJWT();

      expect(user1.jwt).to.not.equal(user2.jwt);
      done();
    });

  it('should validade password', (done) => {
    let correctPass = 'pass1';
    let invalidPass = '1ssap';
    let correctHash;
    let invalidHash;
    let user1 = new User();

    user1.password = user1.generateHash(correctPass);
    correctHash    = user1.validPassword(correctPass);
    invalidHash    = user1.validPassword(invalidPass);

    expect(true).to.equal(correctHash);
    expect(false).to.equal(invalidHash);

    done();
  });

});
