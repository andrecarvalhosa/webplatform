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
  template: require('./editSkills.html')
})
export class EditSkills {
  public skills: Array<string>=[];

  // TypeScript public modifiers
  constructor(public appState: AppState,public profileService: ProfileService) {

  }

  ngOnInit() {
    console.log('hello `EditSkills` component');
    this.getMyProfile();
    // this.title.getData().subscribe(data => this.data = data);
  }

  getMyProfile(): void{
    this.profileService.getMyProfile().subscribe(
      (res) => {
       // console.log(util.inspect(res));
       this.skills = res.user.profile.skills;

       (<any>$('.chips-initial')).material_chip({
             data: this.skills
       });

       (<any>$('.chips-placeholder')).material_chip({
             placeholder: '+ competências',
             secondaryPlaceholder: 'Nova competência',
       });
      },
      (err) => {console.log(util.inspect(err));}
    );
  }
  setSkills(){
    this.profileService.setSkills(this.skills).subscribe(
      (res) => {
     //   console.log(util.inspect(res));
        window.location.href= '/#/profile';
      },
      (err) => {console.log(util.inspect(err));}
    );
  }
}
