import { expect } from 'chai';
import nock from 'nock';

import * as constants from '../../lib/constants';
import Requester from '../../lib/utils/requester';

describe('Requester class', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('Build url', () => {
    const requester = new Requester();

    const url = requester.buildFullUrl('/login/');

    expect(url).to.equal('http://fakeurl.com/login/');
  });

  describe('get request', () => {
    it('Send get request success', done => {
      nock(BASE_API)
        .get('/some-url')
        .reply(
          200,
          { status: 'ok' }
        );

      const requester = new Requester();

      requester
        .get('/some-url')
        .then(
          (data) => {
            expect(data.status).to.equal('ok');
            done();
          },
          () => {
            expect(false).to.be.true;
          }
        );
    });

    it('Send get request handle 400 errors', done => {
      nock(BASE_API)
        .get('/some-url')
        .reply(
          400,
          { status: 'error' }
        );

      const requester = new Requester();

      requester
        .get('/some-url')
        .then(
          () => {
            expect(false).to.be.true;
          },
          (res) => {
            expect(res.status).to.equal(400);
            done();
          }
        );
    });

    it('Handle 500 error', done => {
      nock(BASE_API)
        .get('/some-url')
        .reply(
          500,
          { status: 'Some error' }
        );

      let actionData;
      const dispatch = action => actionData = action;

      const requester = new Requester(dispatch);

      requester
        .get('/some-url')
        .then(
          () => {
            expect(false).to.equal('true');
          },
          () => {
            expect(actionData.type).to.equal(constants.SHOW_ERROR);
            expect(actionData.payload.message).to.equal('Server error');
            done();
          }
        );
    });

    it('Handle unexpected error', done => {
      nock(BASE_API)
        .get('/some-url')
        .replyWithError('Some error');

      let actionData;
      const dispatch = action => actionData = action;

      const requester = new Requester(dispatch);

      requester
        .get('/some-url')
        .then(
          () => {
            expect(false).to.equal('true');
          },
          () => {
            expect(actionData.type).to.equal(constants.SHOW_ERROR);
            expect(actionData.payload.message).to.equal('Unexpected error');
            done();
          }
        );
    });
  });

  describe('POST', () => {
    it('Send request success', done => {
      nock(BASE_API)
        .post('/some-url')
        .reply(
          200,
          { status: 'ok' }
        );

      const requester = new Requester();

      requester
        .post(
          '/some-url',
          { login: 'test', password: 'test' }
        )
        .then(
          (data) => {
            expect(data.status).to.equal('ok');
            done();
          },
          () => {
            expect(false).to.be.true;
          }
        );
    });

    it('Send get request handle 400 errors', done => {
      nock(BASE_API)
        .post('/some-url')
        .reply(
          400,
          { status: 'error' }
        );

      const requester = new Requester();

      requester
        .post(
          '/some-url',
          { login: 'test', password: 'test' }
        )
        .then(
          () => {
            expect(false).to.be.true;
          },
          (res) => {
            expect(res.status).to.equal(400);
            done();
          }
        );
    });

    it('Handle 500 error', done => {
      nock(BASE_API)
        .post('/some-url')
        .reply(
          500,
          { status: 'Some error' }
        );

      let actionData;
      const dispatch = action => actionData = action;

      const requester = new Requester(dispatch);

      requester
        .post(
          '/some-url',
          { login: 'test', password: 'test' }
        )
        .then(
          () => {
            expect(false).to.equal('true');
          },
          () => {
            expect(actionData.type).to.equal(constants.SHOW_ERROR);
            expect(actionData.payload.message).to.equal('Server error');
            done();
          }
        );
    });

    it('Handle unexpected error', done => {
      nock(BASE_API)
        .post('/some-url')
        .replyWithError('Some error');

      let actionData;
      const dispatch = action => actionData = action;

      const requester = new Requester(dispatch);

      requester
        .post(
          '/some-url',
          { login: 'test', password: 'test' }
        )
        .then(
          () => {
            expect(false).to.equal('true');
          },
          () => {
            expect(actionData.type).to.equal(constants.SHOW_ERROR);
            expect(actionData.payload.message).to.equal('Unexpected error');
            done();
          }
        );
    });
  });

  describe('PUT', () => {
    it('Send request success', done => {
      nock(BASE_API)
        .put('/some-url')
        .reply(
          200,
          { status: 'ok' }
        );

      const requester = new Requester();

      requester
        .put(
          '/some-url',
          { login: 'test', password: 'test' }
        )
        .then(
          (data) => {
            expect(data.status).to.equal('ok');
            done();
          },
          () => {
            expect(false).to.be.true;
          }
        );
    });

    it('Send get request handle 400 errors', done => {
      nock(BASE_API)
        .put('/some-url')
        .reply(
          400,
          { status: 'error' }
        );

      const requester = new Requester();

      requester
        .put(
          '/some-url',
          { login: 'test', password: 'test' }
        )
        .then(
          () => {
            expect(false).to.be.true;
          },
          (res) => {
            expect(res.status).to.equal(400);
            done();
          }
        );
    });

    it('Handle 500 error', done => {
      nock(BASE_API)
        .put('/some-url')
        .reply(
          500,
          { status: 'Some error' }
        );

      let actionData;
      const dispatch = action => actionData=action;

      const requester = new Requester(dispatch);

      requester
        .put(
          '/some-url',
          { login: 'test', password: 'test' }
        )
        .then(
          () => {
            expect(false).to.equal('true');
          },
          () => {
            expect(actionData.type).to.equal(constants.SHOW_ERROR);
            expect(actionData.payload.message).to.equal('Server error');
            done();
          }
        );
    });

    it('Handle unexpected error', done => {
      nock(BASE_API)
        .put('/some-url')
        .replyWithError('Some error');

      let actionData;
      const dispatch = action => actionData=action;

      const requester = new Requester(dispatch);

      requester
        .put(
          '/some-url',
          { login: 'test', password: 'test' }
        )
        .then(
          () => {
            expect(false).to.equal('true');
          },
          () => {
            expect(actionData.type).to.equal(constants.SHOW_ERROR);
            expect(actionData.payload.message).to.equal('Unexpected error');
            done();
          }
        );
    });

  });

  describe('Token auth', () => {
    it('Set token to requester', done => {
      nock(BASE_API)
        .matchHeader('Authorization', 'Token sometoken')
        .get('/some-url')
        .reply(200, 'Ok');

      const dispatch = () => {};

      const requester = new Requester(dispatch, 'sometoken');

      requester
        .get('/some-url')
        .then(() => done());
    });

    it('Logout it returns 401', done => {
      nock(BASE_API)
        .matchHeader('Authorization', 'Token sometoken')
        .get('/some-url')
        .reply(401, 'Authorized');

      let actionData = null;

      const dispatch = (action) => actionData = action;

      const requester = new Requester(dispatch, 'sometoken');

      requester
        .get('/some-url')
        .then(
          () => {},
          () => {
            expect(actionData.type).to.equal(constants.LOG_OUT);
            done();
          }
        );
    });
  });
});
