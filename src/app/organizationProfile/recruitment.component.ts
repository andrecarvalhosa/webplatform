import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {JobOfferService} from "./jobOffer.service";
import {Observable} from 'rxjs/Observable';

const util = require('util');

export class Contact {
  constructor(public name: string,public info: string) {
  }
}

export class Opportunity {
  constructor(
    public id: string,
    public title: string,
    public candidates: Array<Candidate>,
    public maxCandidates: number,
    public date: string) {
  }
}

export class Candidate {
  constructor(
    public name: string,
    public photoPath: string) {
  }
}

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'profile2',  // <home></home>
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
  template: require('./recruitment.html')
})
export class Recruitment {

  candidate1 = new Candidate(
    'João Monteiro',
    '../../assets/img/hero.png'
  );

  public _opportunities: Array<Opportunity>=[];

  // TypeScript public modifiers
  constructor(public appState: AppState, public _jobOfferService:  JobOfferService) {

  }

  ngOnInit() {
    console.log('hello `Profile2` component');
    this.loadOffers();
  }

  get opportunities() {
    return Observable.of(this._opportunities);
  }

  loadOffers(){
    let component = this;
    this._jobOfferService.getOwn().subscribe( function (res){
      component._opportunities = res.map(function(jobOffer) {
          const title = jobOffer.role;
          const id = jobOffer._id;
          const candidates = jobOffer.applications.map(function(application) {
            return component.candidate1;
          });
          const maxCandidates = jobOffer.candidatesLimit;
          const date = jobOffer.expirationDate.substring(0, jobOffer.expirationDate.indexOf('T'));

          return new Opportunity(id, title, candidates, maxCandidates, date);
      });
    })
  }

  deleteOffer(id : string) {
    const component = this;
    this._jobOfferService.deleteOffer(id).subscribe(function (res) {
      component.loadOffers();
    })
  }

}
