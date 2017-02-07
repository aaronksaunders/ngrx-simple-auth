import {Component} from '@angular/core';

import {NavController, Loading, LoadingController} from 'ionic-angular';
import {Store} from "@ngrx/store";
import {AuthActions, AuthenticationState} from "../../reducers/authentication.reducer";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private currentUser = null;
  private loading:Loading = null;

  constructor(public navCtrl: NavController,
              private loadingCtrl:LoadingController,
              private store: Store<AuthenticationState>) {

    var dispose = this.store.select('authReducer').subscribe(
      (currentState: AuthenticationState) => {
        console.log("auth store changed - ", currentState);

        this.handleProgressDialog(currentState);

        //
        if (currentState.isLoggedIn === false ) {
          dispose.unsubscribe();
          this.navCtrl.setRoot(LoginPage, {});
          return;
        }


        this.currentUser = currentState.user;

      },
      error => {
        console.log(error)
      }
    );

  }

  doLogout() {
    this.store.dispatch({
      type: AuthActions.LOGOUT,
      payload: {}
    })
  }


  /**
   *
   * @param _currentState
   */
  handleProgressDialog(_currentState) {
    if (_currentState.inProgress && this.loading === null) {
      this.loading = this.loadingCtrl.create({
        content: "Logging Out User..."
      });
      this.loading.present()
    }


    if (!_currentState.inProgress && this.loading !== null) {
      this.loading && this.loading.dismiss();
      this.loading = null;
    }

  }
}
