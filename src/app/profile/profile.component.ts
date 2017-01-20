import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {Main} from './main.component';
import {Profile2} from './profile2.component';
import {Applications} from './applications.component';
import {EditPersonalInfo} from './editPersonalInfo.component';
import {EditAboutMe} from './editAboutMe.component';
import {EditSkills} from './editSkills.component';
import {ApplicationDetails} from './applicationDetails.component';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {LoginService} from "../login/login.service";
const util = require('util');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'profile',  // <home></home>
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
  { path: '/profile2',  name: 'Profile2',  component: Profile2 },
  { path: '/applications', name: 'Applications', component: Applications },
  { path: '/editPersonalInfo', name: 'EditPersonalInfo', component: EditPersonalInfo },
  { path: '/editAboutMe', name: 'EditAboutMe', component: EditAboutMe },
  { path: '/editSkills', name: 'EditSkills', component: EditSkills },
  { path: '/applicationDetails/:id', name: 'ApplicationDetails', component: ApplicationDetails }
])
export class Profile {
  // TypeScript public modifiers
  constructor(public appState: AppState, public loginService:LoginService) {

  }

  ngOnInit() {
    console.log('hello `Profile` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  logout() {
    this.loginService.logout(() => window.location.href = '/');
  }

}
