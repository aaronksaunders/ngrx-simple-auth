import {Component} from '@angular/core';
import {Platform, LoadingController, Loading} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {HomePage} from '../pages/home/home';
import {Store} from "@ngrx/store";
import {LoginPage} from "../pages/login/login";
import {AuthActions, AuthenticationState} from "../reducers/authentication.reducer";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  loading: Loading;

  constructor(platform: Platform,
              private loadingCtrl: LoadingController,
              private store: Store<any>) {


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // LISTEN FOR CHANGES ON THE AUTH Store
    var s = this.store.select('authReducer').subscribe(
      (currentState: AuthenticationState) => {
        console.log("auth store changed - ", currentState)


        this.handleProgressDialog(currentState);

        if (currentState.tokenCheckComplete) {
          s.unsubscribe();
          this.rootPage = currentState.user ? HomePage : LoginPage;
          return;
        }
      },
      error => {
        console.log(error)

      });

    // check to see if we have a saved user
    this.store.dispatch({
      type: AuthActions.CHECK_AUTH
    });
  }

  handleProgressDialog(_currentState) {
    if (_currentState.inProgress && this.loading === null) {
      this.loading = this.loadingCtrl.create({
        content: "Checking for Saved Token..."
      });
      this.loading.present()
    }


    if (!_currentState.inProgress && this.loading !== null) {
      this.loading && this.loading.dismiss();
      this.loading = null;
    }

  }
}
