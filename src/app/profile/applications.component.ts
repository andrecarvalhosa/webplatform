import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {JobApplicationService} from './jobApplication.service'
import {Observable} from 'rxjs/Observable';

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
  selector: 'applications',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ ...HTTP_PROVIDERS, JobApplicationService],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./profile.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./applications.html')
})

export class Applications {

  opportunity1= new Opportunity('',
    'Engenheiro Informático (M/F)',
    'Microsoft',
    'Porto, Portugal',
    '25/12/2016',
    'Mestrado em engenharia informática ou similar',
    'Backend dev, NoSQL, Scrum, trabalha bem em equipa'
  );

  public _opportunities: Array<Opportunity>=[];

  // TypeScript public modifiers
  constructor(public appState: AppState, public _jobApplicationService:  JobApplicationService) {

  }

  ngOnInit() {
    console.log('hello `Profile3` component');
    this.loadApplications();
  }

  get opportunities() {
    return Observable.of(this._opportunities);
  }

  loadApplications(){
    let component = this;
    this._jobApplicationService.getOwnApplications().subscribe( function(res){
      component._opportunities = res.map( function (jobApplication){
        const id = jobApplication._id;
        const title = jobApplication.offer.role;
        const company = jobApplication.offer.organization.name;
        const location = jobApplication.offer.local;
        const date = jobApplication.offer.expirationDate.substring(0, jobApplication.offer.expirationDate.indexOf('T'));
        const qualifications = jobApplication.offer.minimumQualifications;
        const skills = jobApplication.offer.skills;

        return new Opportunity(id, title, company, location, date, qualifications, skills);
      });
    })
  }

  deleteApplication(id : string) {
    const component = this;
    this._jobApplicationService.deleteApplication(id).subscribe(function (res) {
      component.loadApplications();
    })
  }
}
