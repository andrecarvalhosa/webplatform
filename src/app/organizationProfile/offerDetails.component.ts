import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {JobOfferService} from "./jobOffer.service";

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
    public skills: string,
    public candidates: Array<Candidate>,
    public maxCandidates: number) {
  }
}

export class Candidate {
  constructor(
    public name: string,
    public photoPath: string,
    public motivationLetter: string) {
  }
}

function download(strData, strFileName, strMimeType) {
    var D = document,
        a = D.createElement("a");
        strMimeType= strMimeType || "application/octet-stream";

    if (navigator.msSaveBlob) { // IE10
        return navigator.msSaveBlob(new Blob([strData], {type: strMimeType}), strFileName);
    } /* end if(navigator.msSaveBlob) */

    if ('download' in a) { //html5 A[download]
        a.href = "data:" + strMimeType + "," + encodeURIComponent(strData);
        a.setAttribute("download", strFileName);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            a.click();
            D.body.removeChild(a);
        }, 66);
        return true;
    } /* end if('download' in a) */

    //do iframe dataURL download (old ch+FF):
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" +  strMimeType   + "," + encodeURIComponent(strData);

    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
} /* end download() */

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'offerDetails',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [...HTTP_PROVIDERS, JobOfferService],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./profile.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./offerDetails.html')
})

export class OfferDetails {

  candidate1 = new Candidate(
    'João Monteiro',
    '../../assets/img/hero.png',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam venenatis vel nulla a gravida. Donec orci lectus, lobortis vitae est et, faucibus tincidunt elit. Donec sit amet ultricies turpis, nec pulvinar lacus. Mauris quis elit lectus. Sed dignissim laoreet diam, vel rutrum lacus blandit nec. Cras nec accumsan tellus, quis bibendum lacus. Proin vehicula dui id metus aliquet condimentum. Nunc mollis felis vel faucibus dapibus. Suspendisse leo massa, varius et pulvinar sed, dapibus eget dolor. Suspendisse eget tristique lorem. Donec sollicitudin leo quis sapien dictum, sed aliquam nulla cursus. Aenean vel semper urna. Curabitur auctor sapien at consequat semper. Nulla facilisi. Curabitur nec neque mi. Aliquam a orci porttitor ligula volutpat hendrerit ac id tellus. Sed nunc turpis, scelerisque quis tellus at, feugiat lobortis urna. Phasellus sodales, enim vel porttitor ullamcorper, sapien velit tempor nulla, sit amet condimentum nisi risus et eros. Aliquam porta a nisi eu luctus. Donec suscipit blandit sollicitudin. Maecenas lacinia venenatis vulputate. Sed interdum nisl ac accumsan pretium. Vestibulum in pellentesque nibh. Integer ut suscipit justo, non tempus ex. Donec eget gravida odio, a hendrerit erat. Donec euismod turpis at pulvinar eleifend. Nulla ut nulla vitae quam rhoncus volutpat at fringilla ante. Pellentesque bibendum, erat sit amet malesuada imperdiet, tortor sapien auctor nisi, at aliquet felis quam porttitor felis. In vestibulum blandit nisl at condimentum. Phasellus viverra ac arcu sed iaculis.'
  );

  public candidates: Array<Candidate>=[];

  public opportunity = new Opportunity(
    'Engenheiro Informático (M/F)',
    'Microsoft',
    'Porto, Portugal',
    '25/12/2016',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet pellentesque neque. Vivamus nec turpis mollis lectus egestas finibus non sed quam. Maecenas aliquet elit ac diam maximus, quis porta diam laoreet. Donec lobortis arcu sed mi cursus aliquet. Suspendisse eget interdum nibh, non fermentum purus. Praesent efficitur tincidunt massa, et pulvinar neque. Vivamus lacinia iaculis metus, id egestas arcu pretium in. Aenean porttitor ullamcorper mattis. Nam id fringilla lorem. Ut eu turpis ac quam euismod bibendum. Vestibulum mollis maximus ex, ut fermentum nulla.',
    'Por favor, escreva aqui a sua carta de motivação',
    'Salário de 5M€ por dia, com alojamento garantido numa mansão nas Caraíbas. Tem direito a carro e telemóvel da empresa, ambos topo de gama. Seguro de saúde incluído. Horário flexível.',
    2,
    'Mestrado em engenharia informática ou similar',
    'Backend dev, NoSQL, Scrum, trabalha bem em equipa',
    this.candidates,
    50
  );

  public id : string;

  // TypeScript public modifiers
  constructor(public appState: AppState, private _jobOfferService: JobOfferService) {

  }

  ngOnInit() {
    this.id = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    this.showOfferDetails();
  }

  showOfferDetails(){
    const component = this;
    this._jobOfferService.getOfferDetails(this.id).subscribe( function(res){
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
      component.opportunity.candidates = res.applications.map(function (application){
        component.candidate1 = new Candidate('João Monteiro','../../assets/img/hero.png',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam venenatis vel nulla a gravida. Donec orci lectus, lobortis vitae est et, faucibus tincidunt elit. Donec sit amet ultricies turpis, nec pulvinar lacus. Mauris quis elit lectus. Sed dignissim laoreet diam, vel rutrum lacus blandit nec. Cras nec accumsan tellus, quis bibendum lacus. Proin vehicula dui id metus aliquet condimentum. Nunc mollis felis vel faucibus dapibus. Suspendisse leo massa, varius et pulvinar sed, dapibus eget dolor. Suspendisse eget tristique lorem. Donec sollicitudin leo quis sapien dictum, sed aliquam nulla cursus. Aenean vel semper urna. Curabitur auctor sapien at consequat semper. Nulla facilisi. Curabitur nec neque mi. Aliquam a orci porttitor ligula volutpat hendrerit ac id tellus. Sed nunc turpis, scelerisque quis tellus at, feugiat lobortis urna. Phasellus sodales, enim vel porttitor ullamcorper, sapien velit tempor nulla, sit amet condimentum nisi risus et eros. Aliquam porta a nisi eu luctus. Donec suscipit blandit sollicitudin. Maecenas lacinia venenatis vulputate. Sed interdum nisl ac accumsan pretium. Vestibulum in pellentesque nibh. Integer ut suscipit justo, non tempus ex. Donec eget gravida odio, a hendrerit erat. Donec euismod turpis at pulvinar eleifend. Nulla ut nulla vitae quam rhoncus volutpat at fringilla ante. Pellentesque bibendum, erat sit amet malesuada imperdiet, tortor sapien auctor nisi, at aliquet felis quam porttitor felis. In vestibulum blandit nisl at condimentum. Phasellus viverra ac arcu sed iaculis.'
        );
        component.candidate1.name = application.hero.name;
        /*if (application.hero.photo == null)
          component.candidate1.photoPath = application.hero.photo;
        else component.candidate1.photoPath = '../../assets/img/hero.png';*/
        //component.candidate1.photoPath = application.hero.photo;
       component.candidate1.motivationLetter = application.extraRequest;
        return component.candidate1;
      });
      component.opportunity.maxCandidates = res.candidatesLimit;
    })
  }

  cancelOffer() {
    this._jobOfferService.deleteOffer(this.id).subscribe(function(res) {
      window.location.href = '/#/organizationProfile/profile2';
    })
  }

  exportCSV(){
    this._jobOfferService.getApplicationDetails(this.id).subscribe(function (res) {

      var filename = res.headers.get('content-disposition').substring(res.headers.get('content-disposition').indexOf('=')+ 1, res.headers.get('content-disposition').length);
      download(res.text(), filename, "text/csv");
    })
  }
}
