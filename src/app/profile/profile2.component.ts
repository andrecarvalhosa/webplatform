import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {ProfileService} from './profile.service';
import {HTTP_PROVIDERS} from '@angular/http';

const util = require('util');

export class Contact {
  constructor(public name: string,public info: string) {
  }
}

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'profile2',  // <home></home>
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
  template: require('./profile2.html')
})
export class Profile2 {

  contact1= new Contact(
  'name1',
  'info1'
  );

  contact2= new Contact(
    'name2',
    'info2'
  );

  contact3= new Contact(
    'name3',
    'info3'
  );

  public contacts: Array<Contact>=[this.contact1,this.contact2,this.contact3];

  // TypeScript public modifiers
  constructor(public appState: AppState,public profileService: ProfileService) {

  }

  ngOnInit() {
    console.log('hello `Profile2` component');
    this.getMyProfile();
    // this.title.getData().subscribe(data => this.data = data);
  }

  getMyProfile(){
    this.profileService.getMyProfile().subscribe(
      (res) => {console.log(util.inspect(res));},
      (err) => {console.log(util.inspect(err));}
    );
  }


}
