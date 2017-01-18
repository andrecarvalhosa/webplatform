import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {JobOfferService} from "./jobOffer.service";

const util = require('util');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'newOffer',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ ...HTTP_PROVIDERS, JobOfferService],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./profile.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./newOffer.html')
})
export class NewOffer {
  title : string;
  description : string;
  location : string;
  date : string;
  qualifications : string;
  skills : string;
  benefits : string;
  motivationLetter : string;
  maxCandidates : number;
  amountNeeded : number;

  // TypeScript public modifiers
  constructor(public appState: AppState, public _jobOfferService:  JobOfferService) {

  }

  ngOnInit() {
    console.log('hello `NewOffer` component');
  }

  createOffer() {
    this._jobOfferService.create(this.title, this.description, this.location, this.date, this.qualifications, this.skills, this.benefits, this.motivationLetter, this.maxCandidates, this.amountNeeded)
      .subscribe( function (res){
        console.log(util.inspect(res));
        window.location.href = '/#/organizationProfile/recruitment';
      })
  }
}
