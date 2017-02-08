# ngrx-simple-auth
Ionic 2 ngrx/store ngrx/effects ngrx/store-dev-tools authentication with token example - Ionicframework

Install the core ngrx functionality with the store
```
npm install @ngrx/core @ngrx/store --save
```

Install effects which we will use to call functions as "side-effects" of dispatched states
```
npm install @ngrx/effects --save
```

```
npm install @ngrx/store-devtools --save
```
Download the [Redux Devtools Extension](http://zalmoxisus.github.io/redux-devtools-extension/) which we will use to debug, and watch the state changes in the application

In your root Angular module `import StoreDevtoolsModule.instrumentOnlyWithExtension()`

```Javascript
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    IonicModule.forRoot(MyApp),
    EffectsModule.run(AuthenticationEffects),
    StoreModule.provideStore({authReducer: AuthenticationReducer}),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ]
})
export class AppModule { }
```

Using the `ionic-cli` generate two additional sets of files that we will need, first the login page..
```
ionic g page login
```

And then the authentication provider, we will not connect to a real back end, but we will simulate the delay of the http request to help demonstrate the functionality of @ngrx/effects inside of the authentication provider
```
ionic g provider authentication
 ```

### Getting Started with Ionic Code
 
 We are going to get the basic ionic 2 code out of the way first since we all are already pretty comfortable with the basics of an input form and navigating to a new page
 
 Lets add the page components and the Authentication provider to the `app.module.ts`
 
 ```Javascript
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {Authentication} from "../providers/authentication";
import {LoginPage} from "../pages/login/login";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [Authentication, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
```
Next in the `app.component.ts` we are just going to make the app to straight to `LoginPage` everytime the app starts
```Javascript
import {Component} from '@angular/core';
import {Platform } from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage

  constructor(platform: Platform) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

}
```

On the `login.html` page we have pretty straight forward Ionic2/angular template code
```html
<ion-header>
  <ion-navbar>
    <ion-title>NgRX/Ionic2 App</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding class="login">
  <ion-list>

    <ion-item>
      <ion-label floating>Username</ion-label>
      <ion-input type="text" value="" [(ngModel)]="username"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label floating>Password</ion-label>
      <ion-input type="password" value="" [(ngModel)]="password"></ion-input>
    </ion-item>

  </ion-list>
  <button ion-button (click)="loginClicked($event)">
    Login
  </button>
  <button ion-button (click)="createAccountClicked($event)">
    Create Account
  </button>
  <!-- if there is an error, render it -->
  <div padding *ngIf="error" style="color:red; font-weight: 900">
    <h4>{{error.message}}</h4>
  </div>
</ion-content>
```
In the `LoginPage` component `login.ts` we still have the basic ionic code we all know

```Javascript
import {NavController } from 'ionic-angular';
import {Component} from '@angular/core';

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

  private username

  private password

  private error:Object = null;


  /**
   * Creates an instance of LoginPage.
   *
   * @param {NavController} nav
   *
   * @memberOf LoginPage
   */
  constructor(public nav: NavController ) {
    //This will hold data from our form
    this.username = null;
    this.password = null;
  }

  /**
   *
   * @param {any} event
   *
   * @memberOf LoginPage
   */
  loginClicked(event) {
    console.log("username: " + this.username + " password " + this.password)
    alert("user clicked login - username: " + this.username + " password " + this.password)
  }

  /**
   * NOP at the point
   *
   * @param {any} event
   *
   * @memberOf LoginPage
   */
  createAccountClicked(event) {

  }
}
```
-- WORK-IN-PROGRESS --
