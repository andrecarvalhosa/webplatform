import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {ProfileService} from './profile.service';
import {HTTP_PROVIDERS} from '@angular/http';

const util = require('util');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'editAboutMe',  // <home></home>
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
  template: require('./editAboutMe.html')
})
export class EditAboutMe {
  public about_me='';

  // TypeScript public modifiers
  constructor(public appState: AppState,public profileService: ProfileService) {

  }

  ngOnInit() {
    console.log('hello `EditAboutMe` component');
    this.getMyAbout();
    // this.title.getData().subscribe(data => this.data = data);
  }

  getMyAbout(){
    this.profileService.getMyProfile().subscribe(
      (res) => {console.log(util.inspect(res));
        this.about_me=res.user.profile.story;
      },
      (err) => {console.log(util.inspect(err));}
    );
  }

  setAbout(){
    this.profileService.setAbout(this.about_me).subscribe(
      (res) => {
       // console.log(util.inspect(res));
        window.location.href= '/#/profile';
      },
      (err) => {console.log(util.inspect(err));}
    );
  }
}
