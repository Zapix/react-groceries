import Requester from '../utils/requester';
import constants from '../constants';
import storage from '../persistence/storage';

function setToken(dispatch, token) {
  storage.put('token', token);
  dispatch({
    token,
    type: constants.LOGGED_IN,
  });
}

function setUser(dispatch, user) {
  storage.put('user', JSON.stringify(user));
  dispatch({
    user,
    type: constants.SET_USER,
  });
}

function authenticateAndRedirect(dispatch, data, redirect) {
  setToken(dispatch, data.key);
  setUser(dispatch, data.user);

  if (redirect) {
    redirect();
  }
}

export function login(form, redirect) {
  return dispatch => {
    const requester = new Requester(dispatch);

    dispatch({
      type: constants.SEND_LOG_IN_REQUEST,
    });
    requester
      .post('/rest-auth/login/', form)
      .then(
        (data) => {
          authenticateAndRedirect(dispatch, data, redirect);
        },
        () => {
          dispatch({
            type: constants.LOG_IN_ERROR,
          });
        }
      );
  };
}

/**
 * Tries to register user. Send form data to backend.
 * If user has been registered then authenticate them and
 * redirect to account page. Alse send action to show errors
 * @param {*} form
 * @param {function} redirect
 * @returns {Function}
 */
export function signUp(form, redirect) {
  return dispatch => {
    const requester = new Requester(dispatch);

    dispatch({ type: constants.SIGN_UP_SEND });

    requester
      .post('/rest-auth/registration/', form)
      .then(
        (data) => {
          dispatch({ type: constants.SIGN_UP_SUCCESS });
          authenticateAndRedirect(dispatch, data, redirect);
        },
        (response) => {
          if (response.status === 400) {
            dispatch({
              type: constants.SIGN_UP_ERROR,
              errors: response.body,
            });
          }
        }
      );
  };
}

export function switchLocale(locale) {
  return { type: constants.LOCALE_SWITCHED, payload: locale };
}

export function hideError() {
  return {
    type: constants.HIDE_ERROR,
  };
}
