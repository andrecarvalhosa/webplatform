import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {SearchService} from "./search.service";

const util = require('util');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'orgProfile',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ ...HTTP_PROVIDERS,SearchService],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./search.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./orgProfile.html')
})
export class OrgProfile {
  public name = '';
  public nif ='';
  public location ='';
  public type ='';
  public field ='';
  public website ='';
  public address ='';
  public telephone ='';
  public fax ='';
  public mail ='';
  public description='';
  public profileImg: File;
  //public photo: FormData;
  public logoImage='organization.png';

  // TypeScript public modifiers
  constructor(public appState: AppState,public _searchService: SearchService) {

  }

  public id : string;

  ngOnInit() {
    console.log('hello `orgProfile` component');
    this.id = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    this.getMyProfile();
    // this.title.getData().subscribe(data => this.data = data);
  }

  getMyProfile(){
    this._searchService.getOrganization(this.id).subscribe(
      (res) => {

       // console.log(JSON.stringify(res));

        this.name = res.name;
        this.nif = res.profile.nif;
        this.location = res.profile.hqLocality;
        this.type = res.profile.orgType;
        this.field = res.profile.industryField;
        this.website = res.contacts.website;
        this.address = res.contacts.address;
        this.telephone = res.contacts.telephone;
        this.fax = res.contacts.fax;
        this.mail = res.email;


        if (res.profile.description == '')
          this.description='Campo vazio.';
        else this.description = res.profile.description;

        if (typeof res.profile.logo != 'undefined')
          this.logoImage=res.profile.logo;
      },
      (err) => {console.log(util.inspect(err));}
    );
  }


}
