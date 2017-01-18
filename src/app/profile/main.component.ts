import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {ProfileService} from './profile.service';
import {HTTP_PROVIDERS} from '@angular/http';

const util = require('util');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'main',  // <home></home>
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
  template: require('./main.html')
})
export class Main {
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
  constructor(public appState: AppState,public profileService: ProfileService) {

  }

  changeImage() {
    document.getElementById('uploadImage').style.display = "block";
  }

  uploadImg() {
    this.profileService.uploadImg(this.profileImg[0]);
  }

  fileChangeEvent(fileInput: any) {
    this.profileImg = fileInput.target.files;
    console.log(this.profileImg[0]);
    document.getElementById('uploadButton').style.display = "block";
  }

  ngOnInit() {
    console.log('hello `main` component');
    this.getMyProfile();

    // this.title.getData().subscribe(data => this.data = data);
  }

  getMyProfile(){
    this.profileService.getMyProfile().subscribe(
      (res) => {
        //console.log(util.inspect(res));
        this.username = res.user.name;
        this.place = res.user.profile.location;
        this.work = res.user.profile.situation;
        this.accessible = res.user.profile.deficiency;
        this.mail = res.user.email;
        this.verified_user = 'verified_user';
        if (res.user.profile.skills.length == 0)
          this.skills=[{tag: 'Sem competências. Adicione as suas competências.'}];
        else this.skills = res.user.profile.skills;

        if (res.user.profile.story == '')
          this.about_me='Sem resumo. Adicione o seu resumo.';
        else this.about_me = res.user.profile.story;

        if (typeof res.user.profile.photo != 'undefined')
          this.profileImage=res.user.profile.photo;

      },
      (err) => {console.log(util.inspect(err));}
    );
  }


}
