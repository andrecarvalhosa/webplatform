import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {LoginService} from '../login/login.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {Main} from './main.component';
import {Recruitment} from './recruitment.component';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {EditOrganizationInfo} from "./editOrganizationInfo.component";
import {EditDescription} from "./editDescription.component";
import {NewOffer} from "./newOffer.component";
import {OfferDetails} from "./offerDetails.component";
const util = require('util');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'organization',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [LoginService],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./profile.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./profile.html')
})
@RouteConfig([
  { path: '/main', name: 'Main', component: Main, useAsDefault: true },
  { path: '/recruitment',  name: 'Recruitment',  component: Recruitment },
  { path: '/editOrganizationInfo', name: 'EditOrganizationInfo', component: EditOrganizationInfo },
  { path: '/editDescription', name: 'EditDescription', component: EditDescription },
  { path: '/newOffer', name: 'NewOffer', component: NewOffer },
  { path: '/offerDetails/:id', name: 'OfferDetails', component: OfferDetails }
])

export class OrganizationProfile {
  // TypeScript public modifiers
  constructor(public appState: AppState, public loginService:LoginService) {

  }

  ngOnInit() {
    console.log('hello `OrganizationProfile` component');
  }

  logout() {
    this.loginService.logout(() => window.location.href = '/');
  }

}
