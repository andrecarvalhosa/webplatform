import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {SearchService} from "./search.service";

const util = require('util');

export class Opportunity {
  constructor(
    public id: string,
    public title: string,
    public company: string,
    public location: string,
    public date: string,
    public qualifications: string,
    public skills: string) {
  }
}

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'opportunities',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [...HTTP_PROVIDERS,SearchService],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./search.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./opportunities.html')
})

export class Opportunities {
  opportunity1= new Opportunity('',
    'Engenheiro Informático (M/F)',
    'Microsoft',
    'Porto, Portugal',
    '25/12/2016',
    'Mestrado em engenharia informática ou similar',
    'Backend dev, NoSQL, Scrum, trabalha bem em equipa'
  );

  public opportunities: Array<Opportunity>=[];
  public parameter : string;
  // TypeScript public modifiers
  constructor(public appState: AppState, public _searchService : SearchService) {
  }

  ngOnInit() {
    console.log('hello `Opportunities` component');
    this.parameter = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    this.loadOpportunities();
  }

  loadOpportunities(){
    let component = this;
    this._searchService.getOpportunities(this.parameter).subscribe( function (res){
      component.opportunities = res.map(function(jobOffer) {
        const id =  jobOffer._id;
        const title = jobOffer.role;
        const company = jobOffer.organization.name;
        const location = jobOffer.local;
        const date =  jobOffer.expirationDate.substring(0, jobOffer.expirationDate.indexOf('T'));;
        const qualifications = jobOffer.minimumQualifications;
        const skills = jobOffer.skills;

        return new Opportunity(id, title, company, location, date, qualifications, skills);
      });
    })
  }





}
