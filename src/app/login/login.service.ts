import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LoginService {
 private jwt_localStorage = 'jwt';

  constructor(public http:Http) {}

  login(email: String, password: String, callback) {
    let body = JSON.stringify({email: email, password: password});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post('/api/login', body, options).map((res) => res.json()).subscribe((res) => {
        localStorage.setItem(this.jwt_localStorage,res.jwt);
        callback(res.redirectTo);
      },
        (err) => {
          console.log("Failed to login:");
        });
  }

  logout(callback) {
    localStorage.removeItem(this.jwt_localStorage);

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'JWT ' + localStorage.getItem(this.jwt_localStorage) });
    let options = new RequestOptions({ headers: headers });
        this.http.post('/api/logout', '', options).map((res) => res.json()).subscribe((res) => {
        callback();
      },
        (err) => {
          console.log("Failed to logout:");
        });
  }

}
