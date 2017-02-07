import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs';
import {Observable} from "rxjs";


/*
 Generated class for the Authentication provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Authentication {

  constructor(public http: Http) {
    console.log('Hello Authentication Provider');
  }

  login(params) {
    return new Observable(observer => {
      setTimeout(() => {
        if (params.username === 'aaron' && params.password !== null) {

          // set token
          let token = {name: "aaron", _id: 12345};

          // save token...
          window.localStorage.setItem('AUTH_TOKEN', JSON.stringify(token));

          // return user...
          return observer.next(token)
        } else {
          return observer.error({message: "Login Error: Invalid Username/Password"});
        }
      }, 2000);
    });
  }


  logout() {
    return new Observable(observer => {
      setTimeout(() => {
        window.localStorage.removeItem('AUTH_TOKEN')

        return observer.next({})
      }, 2000);
    });
  }

  checkAuth() {
    return new Observable(observer => {
      setTimeout(() => {
        let token = window.localStorage.getItem('AUTH_TOKEN')
        if (token) {
          return observer.next(JSON.parse(token))
        } else {
          return  observer.next(null)
        }
      }, 1000);
    })
  }

}
