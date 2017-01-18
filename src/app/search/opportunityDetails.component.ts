import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {SearchService} from "./search.service";

const util = require('util');

export class Opportunity {
  constructor(
    public title: string,
    public company: string,
    public location: string,
    public date: string,
    public description: string,
    public motivationLetter: string,
    public benefits: string,
    public amountNeeded: number,
    public qualifications: string,
    public skills: string) {
  }
}

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'opportunityDetails',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [...HTTP_PROVIDERS, SearchService],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./search.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./opportunityDetails.html')
})

export class OpportunityDetails {
  opportunity = new Opportunity(
    'Engenheiro Informático (M/F)',
    'Microsoft',
    'Porto, Portugal',
    '25/12/2016',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet pellentesque neque. Vivamus nec turpis mollis lectus egestas finibus non sed quam. Maecenas aliquet elit ac diam maximus, quis porta diam laoreet. Donec lobortis arcu sed mi cursus aliquet. Suspendisse eget interdum nibh, non fermentum purus. Praesent efficitur tincidunt massa, et pulvinar neque. Vivamus lacinia iaculis metus, id egestas arcu pretium in. Aenean porttitor ullamcorper mattis. Nam id fringilla lorem. Ut eu turpis ac quam euismod bibendum. Vestibulum mollis maximus ex, ut fermentum nulla.',
    'Por favor, escreva aqui a sua carta de motivação',
    'Salário de 5M€ por dia, com alojamento garantido numa mansão nas Caraíbas. Tem direito a carro e telemóvel da empresa, ambos topo de gama. Seguro de saúde incluído. Horário flexível.',
    2,
    'Mestrado em engenharia informática ou similar',
    'Backend dev, NoSQL, Scrum, trabalha bem em equipa'
  );

  // TypeScript public modifiers
  constructor(public appState: AppState, public _searchService : SearchService) {

  }

  public id : string;

  ngOnInit() {
    console.log('hello `OpportunityDetails` component');
    this.id = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    this.loadOpportunity();
  }

  loadOpportunity() {
    let component = this;
    this._searchService.getOfferDetails(this.id).subscribe(function (res) {
      //console.log(util.inspect(res));
      component.opportunity.title = res.role;
      component.opportunity.company = res.organization.name;
      component.opportunity.location = res.local;
      component.opportunity.date = res.expirationDate.substring(0, res.expirationDate.indexOf('T'));
      component.opportunity.description =  res.description;
      component.opportunity.motivationLetter = res.extraRequest;
      component.opportunity.benefits =  res.benefits;
      component.opportunity.amountNeeded = res.positionsAvailable;
      component.opportunity.qualifications = res.minimumQualifications;
      component.opportunity.skills = res.skills;
    })
  }
}
