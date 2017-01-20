// import the `mongoose` helper utilities
let utils = require('../utils');
import chai from 'chai';
let should = chai.should();
let util = require('util');

describe('JOB APPLICATION: ACCEPTANCE TESTS **************************', () => {
  describe('US: List my job applications', () => {
    it("should redirect to 'applications page' when I select the 'Candidaturas' tab", (done) => {
        done();
      });;
  });

  describe('US: Cancel job application', () => {
    it("should redirect to 'applications page' when I select the 'Candidaturas' tab", (done) => {
        done();
      });;
    it("should redirect to 'justifications page' when I click in the 'cancelar candidatura' button", (done) => {
        done();
      });;
    it("should redirect to 'applications page' when I select a reason for canceling and press the 'confirmar cancelamento' button", (done) => {
        done();
      });;
  });

  describe('US: Search for jobs', () => {
    it("should redirect to 'list Job Offers page' when I select the 'procurar oportunidades' option, enter words in the search field and click the 'pesquisar' button");
  });

  describe('US: Apply to a job opportunity', () => {
    it("should redirect to 'apply to job offer page' when I click in the 'candidatar' button");
    it("should redirect to 'offers details page' when I enter the requested information and click in the 'enviar candidatura' button");
    it("should have the 'job offers list' when I go to the 'hero profile page' and select the 'candidaturas' tab");
  });

  describe('US: Notify after job application decision', () => {
    it("should I receive an notification when I was accepted/refused in the jobs offered");
  });
});
