// import the `mongoose` helper utilities
let utils = require('../utils');
import chai from 'chai';
let should = chai.should();
let util = require('util');

describe('HERO PROFILE: ACCEPTANCE TESTS *****************************', () => {
  
  describe('US: Manage hero profile', () => {
    it("should redirect to 'hero profile page' when I click in the button 'editar dados pessoais'");
    it("should redirect to 'hero profile page' when I click in the button 'confirmar alterações'");
    it("should redirect to 'edit about me page' when I click in the button 'editar resumo'");
    it("should redirect to 'edit skills page' when I click in the button 'editar competências'");
    it("should have a button 'confirmar alterações'");
    it("should have the field 'about me'");
    it("should have the field 'competências'");
  });

  describe('US: View hero profile', () => {
    it("should redirect to 'profile page' when I click in one of the heroes");
  });
});
