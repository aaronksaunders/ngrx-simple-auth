import {Action, ActionReducer} from '@ngrx/store';


export const AuthActions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  CHECK_AUTH: 'CHECK_AUTH',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILED: 'LOGOUT_FAILED',
  CHECK_AUTH_SUCCESS: 'CHECK_AUTH_SUCCESS',
  CHECK_AUTH_FAILED: 'CHECK_AUTH_FAILED',
  CHECK_AUTH_SUCCESS_NO_USER: 'CHECK_AUTH_SUCCESS_NO_USER'
}

/**
 * Keeping Track of the AuthenticationState
 */
export interface AuthenticationState {
  inProgress: boolean;            // are we taking some network action
  isLoggedIn: boolean;            // is the user logged in or not
  tokenCheckComplete: boolean;    // have we checked for a persisted user token
  user: Object;                   // current user | null
  error?: Object;                 // if an error occurred | null

}


/**
 * Setting the InitialState for this Reducer's Store
 */
const initialState = {
  inProgress: false,
  isLoggedIn: false,
  tokenCheckComplete: false,
  user: null
};


export const AuthenticationReducer: ActionReducer<AuthenticationState> = (state: AuthenticationState = initialState, action: Action) => {

  console.log(state)

  switch (action.type) {


    case AuthActions.LOGIN: {
      return Object.assign({}, state, {inProgress: true, isLoggedIn: false, error: null})

    }
    case AuthActions.LOGOUT: {
      return Object.assign({}, state, {inProgress: true, isLoggedIn: true})
    }

    case AuthActions.CHECK_AUTH_SUCCESS:
      state = Object.assign({}, state, {tokenCheckComplete: true})
    case AuthActions.LOGIN_SUCCESS: {
      return Object.assign({}, state, {inProgress: false, user: action.payload, isLoggedIn: true})
    }

    case AuthActions.CHECK_AUTH_FAILED:
      state = Object.assign({}, state, {tokenCheckComplete: true})
    case AuthActions.LOGIN_FAILED: {
      return Object.assign({}, state, {inProgress: false, error: action.payload, isLoggedIn: false})
    }


    case AuthActions.LOGOUT_FAILED: {
      return Object.assign({}, state, {inProgress: false, error: action.payload, isLoggedIn: true})
    }

    case AuthActions.CHECK_AUTH_SUCCESS_NO_USER:
      return Object.assign({}, initialState, {tokenCheckComplete: true})

    case AuthActions.LOGOUT_SUCCESS: {
      return Object.assign({}, initialState)
    }

    case AuthActions.CHECK_AUTH: {
      return Object.assign({}, state, {inProgress: true, isLoggedIn: false, tokenCheckComplete: false})
    }

    default:
      return state;
  }
}

