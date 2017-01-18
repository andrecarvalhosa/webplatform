// import the `mongoose` helper utilities
let utils = require('../utils');
import chai from 'chai';
let should = chai.should();
let util = require('util');

describe('ORGANIZATION PROFILE: ACCEPTANCE TESTS *********************', () => {
  
  describe('US: Manage organization profile', () => {
    it("should redirect to 'edit organization info page' when I click in the 'editar dados' button");
    it("should redirect to 'organization profile page' when I fill the form with the desired changes on any field, click on 'editar logótipo da empresa' button, choose a new logo, click on 'abrir' button and click on 'confirmar alterações' button");
    it("should redirect to 'edit description page' when I click in the 'editar descrição' button");
    it("should redirect to 'organization profile page' when I enter information about the organization on 'description' field and click on 'confirmar alterações' button");
  });

  describe('US: View organization profile', () => {
    it("should see all shared information when I click on one of the organizations");
  });
});
