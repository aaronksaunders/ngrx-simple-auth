import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {Authentication} from "../providers/authentication";
import {LoginPage} from "../pages/login/login";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from '@ngrx/effects';
import {AuthenticationReducer} from  "../reducers/authentication.reducer";
import {AuthenticationEffects} from "../reducers/authentication.effects";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    EffectsModule.run(AuthenticationEffects),

    StoreModule.provideStore({authReducer: AuthenticationReducer}),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [Authentication, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
