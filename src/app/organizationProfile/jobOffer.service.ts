import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class JobOfferService {
  private jwt_localStorage = 'jwt';

  constructor(public http:Http) {}

  public create( title : string, description : string, location : string, date : string, qualifications : string, skills : string, benefits : string, motivationLetter : string, maxCandidates : number, amountNeeded : number) {
    let body = JSON.stringify({
      role: title,
      description: description,
      local: location,
      expirationDate: date,
      minimumQualifications: qualifications,
      skills: skills,
      benefits: benefits,
      extraRequest: motivationLetter,
      candidatesLimit: maxCandidates,
      positionsAvailable: amountNeeded
    });
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.post('/api/organizations/jobOffers', body, options).map((res) => res.json());
  }

  public getOwn(){
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/organizations/jobOffers', options).map((res) => res.json());
  }

  public getOfferDetails(id : string){
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/jobOffers/' + id, options).map((res) => res.json());
  }

  public deleteOffer(id : string){
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.delete('/api/organizations/jobOffers/' + id, options).map((res) => res.json());
  }

  public getApplicationDetails(id : string){
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/jobOffers/' + id + '/jobApplications/export', options);
  }
}
