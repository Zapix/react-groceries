import request from 'superagent';
import constants from '../../lib/constants';

export default class Requester {
  /**
   * Set dispatch to handle server error, and token to authorize user.
   * @param {Function} dispatch
   * @param {String} token default null
   */
  constructor(dispatch, token = null) {
    this._dispatch = dispatch;
    this._token = token;
  }

  /**
   * Set auth token to request object if it passed.
   */
  setAuthToken(requestObject) {
    if (this._token) {
      return requestObject.set(
        'Authorization',
        `Token ${this._token}`
      );
    }
    return requestObject;
  }

  /**
   * Send error action is dispatch passed
   * @param {String} message
   */
  handleError(message) {
    if (typeof this._dispatch !== 'undefined') {
      this._dispatch({
        type: constants.SHOW_ERROR,
        payload: { message },
      });
    }
  }

  /**
   * @param {Function} resolve - resolve promise function
   * @param {Function} reject - reject promise function
   * @returns {Function} to handle response in promise object
   */
  getResponseHandler(resolve, reject) {
    return (err, res) => {
      if (err) {
        if (
          typeof res === 'undefined' ||
          typeof res.status === 'undefined'
        ) {
          this.handleError('Unexpected error');
          reject();
        } else if (res.status >= 500 && res.status < 600) {
          this.handleError('Server error');
          reject(res);
        } else if (res.status === 401) {
          this._dispatch({ type: constants.LOG_OUT });
          reject(res);
        } else {
          reject(res);
        }
      } else if (res.status >= 200 && res.status < 300) {
        resolve(res.body);
      }
    };
  }

  /**
   * build full url for request
   * @param {String} url
   * @returns {String}
   */
  buildFullUrl(url) {
    return `${BASE_API}${url}`;
  }

  /**
   * Return promise object that sends get request.
   * If request error then throw err
   * If server return success response then resolve promise.
   * If server return 400-499 response then reject promise.
   * If server return 500 response then throw err
   * Else throw error
   * @param {string} url
   * @param {*} params - object with get params
   * @returns {*} new promise
   */
  get(url, params) {
    return new Promise((resolve, reject) => {
      const fullUrl = this.buildFullUrl(url);
      const requestObject = request
        .get(fullUrl)
        .query(params);

      this.setAuthToken(requestObject)
        .end(this.getResponseHandler(resolve, reject));
    });
  }

  /**
   * Return promise object that sends post request with params
   * @param {string} url
   * @param {*} params
   * @return {*} new promise
   */
  post(url, params) {
    return new Promise((resolve, reject) => {
      const fullUrl = this.buildFullUrl(url);
      const requestObject = request.post(fullUrl);

      this.setAuthToken(requestObject)
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(params))
        .end(this.getResponseHandler(resolve, reject));
    });
  }

  /**
   * Return promise object that sends put request with params
   * @param {string} url
   * @param {*} params
   * @return {*} new promise
   */
  put(url, params) {
    return new Promise((resolve, reject) => {
      const fullUrl = this.buildFullUrl(url);
      const requestObject = request.put(fullUrl);

      this.setAuthToken(requestObject)
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(params))
        .end(this.getResponseHandler(resolve, reject));
    });
  }
}
