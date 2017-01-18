import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class SearchService {
  private jwt_localStorage = 'jwt';

  constructor(public http: Http) {}

  public getIndividual(id : string){
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/heroes/' + id, options).map((res) => res.json());
  }

  public getIndividuals(query: string){
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let search = new URLSearchParams();
    search.set("query", query);
    let options = new RequestOptions({headers: headers, search: search});
    return this.http.get('/api/heroes', options).map((res) => res.json());
  }

  public getOrganization(id : string){
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/orgs/'+ id, options).map((res) => res.json());
  }

  public getOrganizations(query: string){
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let search = new URLSearchParams();
    search.set("query", query);
    let options = new RequestOptions({headers: headers, search: search});
    return this.http.get('/api/organizations', options).map((res) => res.json());
  }

  public getOpportunities(query : string){
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let search = new URLSearchParams();
    search.set("query", query);
    let options = new RequestOptions({headers: headers, search: search});
    return this.http.get('/api/jobOffers', options).map((res) => res.json());
  }

  public getOfferDetails(jobOfferID : string){
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/jobOffers/' + jobOfferID, options).map((res) => res.json());
  }

  public createJobApplication(jobOfferID : string, extraRequest : string) {
    let body = JSON.stringify({
      offer: jobOfferID,
      extraRequest: extraRequest
    });
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.post('/api/jobOffers/'+ jobOfferID + '/jobApplications', body, options).map((res) => res.json());
  }
}
