import {Component}      from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {LoginService}   from './login.service';

const util = require('util');

@Component({
  selector:   'login',
  providers:  [LoginService],
  directives: [ ],
  pipes:      [ ],
  styles:     [ require('./login.css') ],
  template:   require('./login.html')
})

export class Login {
  public email;
  public password;

  constructor(public loginService: LoginService) {}

  ngOnInit() {
    console.log('hello `Login` component');
    this.email = '';
    this.password = '';
  }

  login() {
    this.loginService.login(this.email, this.password, (redirectTo) => {
        window.location.href = redirectTo;
        //this.router.navigate(['/#/Signup']);
    });
  }
}
