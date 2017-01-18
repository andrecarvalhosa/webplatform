/**
 * Created by Tareq Boulakjar. from angulartypescript.com
 */
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class HttpSignupOrgService {
  private _signupUrl:string = "/api/signupOrg";
  constructor(private _http: Http){ }

  signup(email: string, password: string, name: string, nif: number, hqLocality: string, orgType: string, industryField: string, logo: string){

    let body = JSON.stringify({ "email": email, "password": password, "name": name, "nif": nif, "hqLocality": hqLocality, "orgType": orgType, "industryField": industryField, "logo": logo});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });

    return this._http.post(this._signupUrl, body, options).map(res => res.json()).catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || ' error');
  }
}
