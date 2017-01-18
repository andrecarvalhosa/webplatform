import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {ProfileService} from './profile.service';
import {HTTP_PROVIDERS} from '@angular/http';

const util = require('util');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'editPersonalInfo',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ ...HTTP_PROVIDERS,ProfileService],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./profile.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./editPersonalInfo.html')
})
export class EditPersonalInfo {
  public username ='';
  public password = '';
  public situation ='';
  public location='';
  public deficiency ='';
  public email ='';
  public certificate ='';
  public skills: Array<string>=['NaN'];

  // TypeScript public modifiers
  constructor(public appState: AppState,public profileService: ProfileService) {

  }

  ngOnInit() {
    console.log('hello `EditPersonalInfo` component');

   /* (<any>$('.datepicker')).pickadate({
      selectDays: true,
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 100, // Creates a dropdown of 100 years to control year
      format: 'dd/mm/yyyy',
      min: -36500, //100 years old
      max: -4745, //13 years old
      closeOnSelect: true,
      closeOnClear: true,
    });*/

    //this.setMyProfile();
    // this.title.getData().subscribe(data => this.data = data);
  }

  setMyProfile(){
    this.profileService.setMyProfile(this.email,this.password,this.username,
      this.location,this.deficiency,this.situation,this.certificate, this.skills).subscribe(
      (res) => {
        //console.log(util.inspect(res));
        window.location.href= '/#/profile';
      },
      (err) => {console.log(util.inspect(err));}
    );
  }

}
