import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HttpSignupHeroService} from "./http-signupHero-service.component";

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'signuphero',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [HttpSignupHeroService],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./signuphero.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./signuphero.html')
})
export class SignupHero {
  email : string;
  password : string;
  name : string;
  deficiency: string;
  situation: string;
  location: string;
  photo: string;

  // TypeScript public modifiers
  constructor(public appState: AppState, public _httpSignupHeroService: HttpSignupHeroService) {
  }

  ngOnInit() {
    console.log('hello `SignupHero` component');
  }

  postDataToServer(){
    this._httpSignupHeroService.signup(this.email, this.password, this.name, this.deficiency, this.situation, this.location, this.photo).subscribe(
      (data) => {console.log(data); window.location.href = '/#/login'},
      (error) => console.log("Error HTTP Post Service"), // in case of failure show this message
      () => console.log("Job Done Post !")
    );
  }
}
