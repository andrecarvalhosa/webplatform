import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HttpSignupOrgService} from "./http-signupOrg-service.component";

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'signuporg',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [HttpSignupOrgService],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./signuporg.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./signupOrg.html')
})
export class SignupOrg {
  email : string;
  password : string;
  name : string;
  nif : number;
  hqLocality : string;
  orgType : string;
  industryField : string;
  logo : string;

  // TypeScript public modifiers
  constructor(public appState: AppState, public _httpSignupOrgService: HttpSignupOrgService) {
  }

  ngOnInit() {
    console.log('hello `SignupOrg` component');
  }

  postDataToServer(){
    this._httpSignupOrgService.signup(this.email, this.password, this.name, this.nif, this.hqLocality, this.orgType, this.industryField, this.logo).subscribe(
      (data) => {console.log(data); window.location.href = '/#/login'},
      (error) => console.log("Error HTTP Post Service"), // in case of failure show this message
      () => console.log("Job Done Post !")
    );
  }
}
