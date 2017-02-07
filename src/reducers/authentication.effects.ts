import {AuthActions} from './authentication.reducer';
import {Injectable} from '@angular/core'

import {Actions, Effect} from '@ngrx/effects';
import {Authentication} from "../providers/authentication";
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationEffects {
  constructor(private auth: Authentication,
              private actions$: Actions) {
  }

  @Effect() login$ = this.actions$
  // Listen for the 'LOGIN' action
    .ofType(AuthActions.LOGIN)
    .switchMap(action => this.auth.login(action.payload)
      // If successful, dispatch success action with result
        .map((res: any) => ({type: AuthActions.LOGIN_SUCCESS, payload: res}))
        // If request fails, dispatch failed action
        .catch((_error) => Observable.of({type: AuthActions.LOGIN_FAILED, payload: _error}))
    );

  @Effect() logout$ = this.actions$
  // Listen for the 'LOGOUT' action
    .ofType(AuthActions.LOGOUT)
    .switchMap(action => this.auth.logout()
      // If successful, dispatch success action with result
        .map((res: any) => ({type: AuthActions.LOGOUT_SUCCESS, payload: res}))
    );


  @Effect() checkAuth$ = this.actions$
  // Listen for the 'LOGOUT' action
    .ofType(AuthActions.CHECK_AUTH)
    .switchMap(action => this.auth.checkAuth()
      // If successful, dispatch success action with result
        .map((res: any) => {
          if (res !== null) {
            return {type: AuthActions.CHECK_AUTH_SUCCESS, payload: res}
          } else {
            return {type: AuthActions.CHECK_AUTH_SUCCESS_NO_USER}
          }
        })
    );
}

