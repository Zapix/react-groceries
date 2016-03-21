import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;
global.BASE_API = 'http://fakeurl.com';
global.WS_URL = 'http://fakeurl.com/sockjs/';
global.window.localStorage = {
  setItem() {},
  getItem() {},
};

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);
