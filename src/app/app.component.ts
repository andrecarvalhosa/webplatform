// This file contains the main class as well as the necessary
// decorators for creating the primary `app` `component`

// Angular 2 decorators and services
import {Component, ViewEncapsulation } from '@angular/core';
import {RouteConfig, Router }          from '@angular/router-deprecated';

import {AppState } from './app.service';
import {RouterActive } from './shared/directives/router-active/router-active.directive';

import {Home}                         from './home';
import {Login}                        from './login';
import {Signup}                       from './signup';
import {SignupOrg}                    from './signupOrg';
import {SignupHero}                   from './signupHero';
import {Admin}                        from './admin';
import {OrganizationProfile}          from './organizationProfile';
import {MoreInfo}                     from './moreInfo';
import {Benefits}                     from './moreInfo';
import {Profile}                      from './profile';
import {Search}                       from './search';
import {Opportunities}                from './search/opportunities.component';
import {Individuals}                  from './search/individuals.component';
import {Organizations}                from './search/organizations.component';
import {OpportunityDetails}           from './search/opportunityDetails.component';
import {Application}                  from './search/application.component';

// Import NgFor directive
import {NgFor} from '@angular/common';
import {HeroProfile} from "./search/heroProfile.component";
import {OrgProfile} from "./search/orgProfile.component";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [  ],
  directives: [ NgFor,
                RouterActive],
  encapsulation: ViewEncapsulation.None,
  pipes: [],
  // Load our main `Sass` file into our `app` `component`
  styles: [String(require('!style!css!sass!../sass/main.scss'))],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  { path: '/login', name: 'Login', component: Login},
  { path: '/signup', name: 'Signup', component: Signup},
  { path: '/signupOrg', name: 'SignupOrg', component: SignupOrg},
  { path: '/signupHero', name: 'SignupHero', component: SignupHero},
  { path: '/admin', name: 'Admin', component: Admin},
  { path: '/moreInfo', name: 'MoreInfo', component: MoreInfo},
  { path: '/benefits', name: 'Benefits', component: Benefits},
  { path: '/profile/...', name: 'Profile', component: Profile},
  { path: '/organizationProfile/...', name: 'OrganizationProfile', component: OrganizationProfile},
  { path: '/search', name: 'Search', component: Search},
  { path: '/search/opportunities/:query', name: 'Opportunities', component: Opportunities},
  { path: '/search/opportunities', name: 'OpportunitiesAll', component: Opportunities},
  { path: '/search/individuals/heroProfile/:id', name: 'HeroProfile', component: HeroProfile},
  { path: '/search/individuals/:query', name: 'Individuals', component: Individuals},
  { path: '/search/individuals', name: 'IndividualsAll', component: Individuals},
  { path: '/search/organizations/orgProfile/:id', name: 'OrgProfile', component: OrgProfile},
  { path: '/search/organizations/:query', name: 'Organizations', component: Organizations},
  { path: '/search/organizations', name: 'OrganizationsAll', component: Organizations},
  { path: '/search/opportunityDetails/:id', name: 'OpportunityDetails', component: OpportunityDetails},
  { path: '/search/application/:id', name: 'Application', component: Application}

])
export class App {
  // Pass in our application `state`
  // Alternative to using `redux`
  constructor(public appState: AppState) {}

  // Fire off upon initialization
  ngOnInit() {

    console.log('Initial App State', this.appState.state);
  }
}
