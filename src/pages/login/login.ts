import {NavController, LoadingController, Loading} from 'ionic-angular';
import {Component} from '@angular/core';

import {Store} from '@ngrx/store';
import {AuthActions, AuthenticationState} from '../../reducers/authentication.reducer';
import {HomePage} from "../home/home";
/**
 *
 *
 * @export
 * @class LoginPage
 */
@Component({
  templateUrl: 'login.html',
})

export class LoginPage {

  /**
   *
   * @memberOf LoginPage
   */
  username
  /**
   *
   * @memberOf LoginPage
   */
  password

  /**
   *
   * @memberOf LoginPage
   */
  private error:Object = null;
  /**
   *
   * @memberOf LoginPage
   */
  private loading:Loading = null;

  /**
   * Creates an instance of LoginPage.
   *
   * @param {NavController} nav
   * @param {LoadingController} loadingCtrl
   * @param {Store<AuthenticationState>} store
   *
   * @memberOf LoginPage
   */
  constructor(public nav: NavController,
              private loadingCtrl: LoadingController,
              private store: Store<AuthenticationState>) {
    //This will hold data from our form
    this.username = null;
    this.password = null;


    var dispose = this.store.select('authReducer').subscribe(
      (currentState: AuthenticationState) => {
        console.log("auth store changed - ", currentState);
        if (currentState.user) {
          dispose.unsubscribe();
          this.nav.setRoot(HomePage, {});
        }

        this.handleProgressDialog(currentState);

        this.error = currentState.error
      },
      error => {
        console.log(error)
      }
    );

  }


  /**
   *
   * @param _currentState
   */
  handleProgressDialog(_currentState) {
    if (_currentState.inProgress && this.loading === null) {
      this.loading = this.loadingCtrl.create({
        content: "Logging In User..."
      });
      this.loading.present()
    }


    if (!_currentState.inProgress && this.loading !== null) {
      this.loading && this.loading.dismiss();
      this.loading = null;
    }

  }

  /**
   *
   *
   * @param {any} event
   *
   * @memberOf LoginPage
   */
  loginClicked(event) {
    console.log('You selected', event);

    console.log("username: " + this.username + " password " + this.password)


    this.store.dispatch({
      type: AuthActions.LOGIN,
      payload: {
        username: this.username, password: this.password
      }
    });


  }

  /**
   *
   *
   * @param {any} event
   *
   * @memberOf LoginPage
   */
  createAccountClicked(event) {

  }
}
