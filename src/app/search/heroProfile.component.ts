import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {SearchService} from "./search.service";

const util = require('util');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'heroProfile',  // <home></home>
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
  template: require('./heroProfile.html')
})
export class HeroProfile {
  public username ='';
  public place ='';
  public work ='';
  public accessible ='';
  public mail ='';
  public verified_user ='';
  public about_me='';
  public skills: Array<string |{tag: String;}>=[];
  public age: number =40;
  public profileImg: File;
  //public photo: FormData;
  public profileImage='hero.png';

  // TypeScript public modifiers
  constructor(public appState: AppState,public _searchService: SearchService) {

  }

  public id : string;

  ngOnInit() {
    console.log('hello `heroProfile` component');
    this.id = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    this.getMyProfile();

    // this.title.getData().subscribe(data => this.data = data);
  }

  getMyProfile(){
    this._searchService.getIndividual(this.id).subscribe(
      (res) => {

        this.username = res.name;
        this.place = res.profile.location;
        this.work = res.profile.situation;
        this.accessible = res.profile.deficiency;
        this.mail = res.email;
        this.verified_user = 'verified_user';
        if (res.profile.skills.length == 0)
          this.skills=[{tag: 'Sem competências.'}];
        else this.skills = res.profile.skills;

        if (res.profile.story == '')
          this.about_me='Sem resumo.';
        else this.about_me = res.profile.story;

        if (typeof res.profile.photo != 'undefined')
          this.profileImage=res.profile.photo;

      },
      (err) => {console.log(util.inspect(err));}
    );
  }


}
