import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {SearchService} from "./search.service";

const util = require('util');

export class Candidate {
  constructor(
    public id: string,
    public name: string,
    public validated: boolean,
    public photoPath: string,
    public disability: string,
    public local: string,
    public workSit: string,
    public email: string) {
  }
}

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'individuals',  // <home></home>
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
  template: require('./individuals.html')
})

export class Individuals {
  candidate1 = new Candidate(
    '',
    'André Ramos',
    true,
    '../../assets/img/hero.png',
    'Cegueira',
    'Porto, Portugal',
    'À procura de emprego',
    'antonioramos@gmail.com'
  );

  public individuals: Array<Candidate>=[];
  public parameter : string;

  // TypeScript public modifiers
  constructor(public appState: AppState, public _searchService : SearchService) {

  }

  public id : string;

  ngOnInit() {
    console.log('hello `Individuals` component');
    this.parameter = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    this.loadIndividuals();
  }

  loadIndividuals(){
    let component = this;
    this._searchService.getIndividuals(this.parameter).subscribe( function (res){
      component.individuals = res.map(function(hero) {
        //console.log(util.inspect(hero));
        const id =  hero._id;
        const name = hero.name;
        var photoPath='hero.png';

        if (typeof hero.profile.photo != 'undefined')
          photoPath = hero.profile.photo;

        const disability = hero.profile.deficiency;
        const local = hero.profile.location;
        const workSituation = hero.profile.situation;
        const email = hero.email;

        console.log(photoPath);

        return new Candidate(id,name, true ,photoPath, disability, local, workSituation, email);
      });
    })
  }
}
