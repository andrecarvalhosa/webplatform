import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {LoginService} from "../login/login.service";
import {SearchService} from "./search.service";

const util = require('util');

/*export class Opportunity {
  constructor(
    public id: string,
    public title: string,
    public qualifications: string,
    public location: string,
    public skills: string) {
  }
}*/

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'search',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [LoginService, SearchService],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./search.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./search.html')
})



export class Search {
  heroSelected = true;
  orgSelected = false;
  jobSelected = false;

  /*
  id: string;
  title: string = null;
  qualifications: string = null;
  location: string = null;
  skills: string = null;*/
  parameter : string = "";

  // TypeScript public modifiers
  constructor(public appState: AppState, public loginService:LoginService, public _searchService : SearchService) {

  }

  ngOnInit() {
    console.log('hello `Search` component');
    // this.title.getData().subscribe(data => this.data = data)
  }

  sendQueryToServer(){
    //var parameter = null;
 /*   if(this.title)
      parameter = this.title;
    else if (this.qualifications)
              parameter = this.qualifications;
           else if(this.skills)
                  parameter = this.skills;
                else if(this.location)
                        parameter = this.location;*/

    console.log("parametro", this.parameter);
    if(this.parameter)
    {
      if(this.heroSelected)
        window.location.href = '/#/search/individuals/'+this.parameter;
      if(this.orgSelected)
        window.location.href = '/#/search/organizations/'+this.parameter;
      if(this.jobSelected)
        window.location.href = '/#/search/opportunities/'+this.parameter;
    }
    else{
        if(this.heroSelected)
          window.location.href = '/#/search/individuals/'+this.parameter;
        if(this.orgSelected)
          window.location.href = '/#/search/organizations/'+this.parameter;
        if(this.jobSelected)
          window.location.href = '/#/search/opportunities/'+this.parameter;
      }
  }

  logout() {
    this.loginService.logout(() => window.location.href = '/');
  }
}
