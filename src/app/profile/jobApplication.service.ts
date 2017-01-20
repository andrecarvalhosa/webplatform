import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class JobApplicationService {
  private jwt_localStorage = 'jwt';

  constructor(public http:Http) {}

  public getOwnApplications(){
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/heroes/jobApplications', options).map((res) => res.json());
  }

  public deleteApplication(id : string){
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.delete('/api/heroes/jobApplications/' + id, options).map((res) => res.json());
  }

  public getApplicationDetails(id : string){
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/heroes/jobApplications/' + id, options).map((res) => res.json());
  }
}
