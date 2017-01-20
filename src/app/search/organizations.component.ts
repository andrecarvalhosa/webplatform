import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {SearchService} from "./search.service";

const util = require('util');

export class Organization {
  constructor(
    public id: string,
    public name: string,
    public validated: boolean,
    public photoPath: string,
    public type: string,
    public local: string,
    public field: string,
    public site: string) {
  }
}

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'organizations',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [...HTTP_PROVIDERS,SearchService],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./search.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./organizations.html')
})

export class Organizations {
  candidate1 = new Organization(
    '',
    'Microsoft',
    false,
    '../../assets/img/organization.png',
    'Empresa',
    'Porto, Portugal',
    'Software',
    'www.microsoft.com'
  );

  public organizations: Array<Organization>=[];
  public parameter : string;

  // TypeScript public modifiers
  constructor(public appState: AppState, public _searchService : SearchService) {

  }

  ngOnInit() {
    console.log('hello `Organizations` component');
    this.parameter = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    this.loadOrganizations();
  }

  loadOrganizations(){
    let component = this;
    this._searchService.getOrganizations(this.parameter).subscribe( function (res){
      component.organizations = res.map(function(org) {
        //console.log(util.inspect(org));
        const id =  org._id;
        const name = org.name;

        var photoPath='organization.png';

        if (typeof org.profile.logo != 'undefined')
          photoPath=org.profile.logo;

        const type = org.profile.orgType;
        const local = org.profile.hqLocality;
        const field = org.profile.industryField;
        var site = org.contacts.website;
        if (org.contacts.website == null){
          site = "indefinido";
        }
        else {
          site = org.contacts.website;
        }
        return new Organization(id,name,false ,photoPath, type, local, field, site);
      });
    })
  }
}
