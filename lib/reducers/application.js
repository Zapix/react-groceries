import { fromJS } from 'immutable';

import constants from '../constants';
import createReducer from '../utils/create-reducer';

const initialState = fromJS({
  token: null,
  locale: 'en',
  user: {},
  error: null,
});

/**
 * Set token for user auth
 * @param {*} state current state of application
 * @param {*} action action with token
 * @returns {*} updated state of application
 */
function login(state, action) {
  return state.set('token', action.token);
}

/**
 * Set token and user to null when user logged out.
 * @param {*} state current state of application
 * @returns {*} updated state of application
 */
function logout(state) {
  return state.merge(fromJS({
    user: null,
    token: null,
  }));
}

/**
 * Set user info.
 * @param {*} state current state of application
 * @param {*} action action with token
 * @returns {*} updated state of application
 */
function setUser(state, action) {
  return state.set('user', fromJS(action.user));
}

/**
 * set login error to true
 * @param {*} state current state of application
 * @returns {*} updated state of application
 */
function showLogInError(state) {
  return state.set('loginError', true);
}

/**
 * Remove login error.
 * @param {*} state current state of application
 * @returns {*} updated state of application
 */
function sendLogInRequest(state) {
  return state.remove('loginError');
}

/**
 * Remove signUpError. set signUpProcessing to true
 * @param {*} state current state
 * @returns {*} updated state of application
 */
function sendSignUpRequest(state) {
  return state
    .remove('signUpErrors')
    .set('signUpProcessing', true);
}

/**
 * Remove signUpProcessing.
 * @param {*} state current state of application
 * @returns {*} updated state of application
 */
function handleSignUpSuccess(state) {
  return state.remove('signUpProcessing');
}

/**
 * Remove signUpProcessing.  set signUpErrors
 * @param {*} state current state of application
 * @param {*} action object with errors
 * @returns {*} updated state of application
 */
function showSignUpError(state, action) {
  return state
      .remove('signUpProcessing')
      .set('signUpErrors', fromJS(action.errors));
}

function showError() {}

function hideError() {}

const actionHandlers = {
  [constants.SEND_LOG_IN_REQUEST]: sendLogInRequest,
  [constants.LOGGED_IN]: login,
  [constants.LOG_IN_ERROR]: showLogInError,
  [constants.LOG_OUT]: logout,

  [constants.SIGN_UP_SEND]: sendSignUpRequest,
  [constants.SIGN_UP_SUCCESS]: handleSignUpSuccess,
  [constants.SIGN_UP_ERROR]: showSignUpError,

  [constants.SET_USER]: setUser,
  [constants.SHOW_ERROR]: showError,
  [constants.HIDE_ERROR]: hideError,
};

export default createReducer(initialState, actionHandlers);
