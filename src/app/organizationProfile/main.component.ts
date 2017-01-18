import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {ProfileService} from './profile.service';
import {HTTP_PROVIDERS} from '@angular/http';

const util = require('util');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'profile1',  // <home></home>
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
  }

  getMyProfile(){
    this.profileService.getMyProfile().subscribe(
      (res) => {
        this.name = res.user.name;
        this.nif = res.user.profile.nif;
        this.location = res.user.profile.hqLocality;
        this.type = res.user.profile.orgType;
        this.field = res.user.profile.industryField;
        this.website = res.user.contacts.website;
        this.address = res.user.contacts.address;
        this.telephone = res.user.contacts.telephone;
        this.fax = res.user.contacts.fax;
        this.mail = res.user.email;


        if (res.user.profile.description == '')
          this.description='Campo vazio. Adicione um texto sobre a empresa.';
        else this.description = res.user.profile.description;

        if (typeof res.user.profile.logo != 'undefined')
          this.logoImage=res.user.profile.logo;
      },
      (err) => {console.log(util.inspect(err));}
    );
  }


}
