// import the `mongoose` helper utilities
let utils = require('../utils');
import chai from 'chai';
let should = chai.should();
let util = require('util');

describe('JOB OPPORTUNITY: ACCEPTANCE TESTS **************************', () => {

  describe('US: Create a job opportunity', () => {
    it("should redirect to a 'recruitment page' when I click in the 'recrutamento' tab", (done) => {
        done();
      });
    it("should redirect to a 'create new job offer page' when I click in the 'criar nova oferta de emprego' button", (done) => {
        done();
      });
    it("should redirect to the 'recrutamento' tab when I enter the offers details and click on 'criar oferta' button", (done) => {
        done();
      });
    it("should have a button 'criar nova oferta de emprego' in 'recruitment page'", (done) => {
        done();
      });
    it("should have a job offers list in the 'recruitment page'", (done) => {
        done();
      });
    it("should have a button 'criar oferta' in 'create new job offer page'", (done) => {
        done();
      });
    });

  describe('US: List my job opportunities', () => {
    it("should redirect to a 'list job opportunities page' when I click in the 'recrutamento' tab on the 'organization profile page'", (done) => {
        done();
      });
  });

  describe('US: Cancel job opportunity', () => {
    it("should have a button 'cancelar oferta' on an application", (done) => {
        done();
      });

    it("should redirect to the 'justifications page' when I click in the 'cancelar oferta' button", (done) => {
        done();
      });

    it("should redirect to the 'list job offers page' when I select a reason for withdrawing the offer and press the 'confirmar cancelamento' button", (done) => {
        done();
      });
  });

  describe('US: Choose a hero for a job application', () => {
    it("should have a 'recrutamento' tab");
    it("should have a 'aceitar candidato' button");
    it("should redirect to the 'job offer details page' when I click the 'recrutamento' tab and click on one of the job offers");
    it("should application marked as accepted, all other applications will be marked as declined and the job offer is closed");
  });

  describe('US: Export job applications', () => {
    it("should have a 'exportar candidatos' button in the job offer detail page");
  });
});
