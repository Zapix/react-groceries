/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import sinon from 'sinon';
import {
  default as AsyncSocket,
  __Rewire__ as rewire,
} from '../../lib/utils/AsyncSocket';

describe('AsyncSocket', () => {
  let fakeSocketInstance;
  before(() => {

  });

  it('Handle connection open', done => {
    let fakeSocketInstance;
    class FakeSocket {
      constructor() {
        this.onopen = null;
        this.onmessage = null;
        this.onclose = null;
        fakeSocketInstance = this;
      }
    }
    rewire('SockJS', FakeSocket);

    const socket = new AsyncSocket(done);
    expect(socket).to.be.ok;
    fakeSocketInstance.onopen();
  });

  it('Handle connection close', done => {
    let fakeSocketInstance;
    class FakeSocket {
      constructor() {
        this.onopen = null;
        this.onmessage = null;
        this.onclose = null;
        fakeSocketInstance = this;
      }
    }
    rewire('SockJS', FakeSocket);

    const socket = new AsyncSocket(() => {}, done);
    expect(socket).to.be.ok;
    fakeSocketInstance.onclose();
  });

  it('Socket send message', () => {
    let sendMessage;

    class FakeSocket {
      send(message) {
        sendMessage = message;
      }
    }
    rewire('SockJS', FakeSocket);

    const socket = new AsyncSocket();
    socket.send('ACTION', { test: 1 });

    expect(sendMessage).to.be.ok;
    const messageData = JSON.parse(sendMessage);
    expect(messageData.action_type).to.equals('ACTION');
    expect(messageData.data.test).to.equals(1);
  });

  it('Socket handle message', () => {
    let messageData;
    const messageHandler = data => messageData = data;

    class FakeSocket {
      constructor() {
        this.onopen = null;
        this.onmessage = null;
        this.onclose = null;
        fakeSocketInstance = this;
      }
    }
    rewire('SockJS', FakeSocket);

    const socket = new AsyncSocket();
    socket.addMessageHandler('NEW_EVENT', messageHandler);

    const serverMessage = {
      data: JSON.stringify({
        event_type: 'NEW_EVENT',
        data: { test: 1 },
      }),
    };

    fakeSocketInstance.onmessage(serverMessage);
    expect(messageData.test).to.equals(1);
  });

  it('Socket replace handler', () => {
    let messageData;
    const firstHandler = () => {};
    const secondHandler = () => messageData = 'replaced';

    class FakeSocket {
      constructor() {
        this.onopen = null;
        this.onmessage = null;
        this.onclose = null;
        fakeSocketInstance = this;
      }
    }
    rewire('SockJS', FakeSocket);
    const socket = new AsyncSocket();
    socket.addMessageHandler('NEW_EVENT', firstHandler);
    socket.addMessageHandler('NEW_EVENT', secondHandler);

    const serverMessage = {
      data: JSON.stringify({
        event_type: 'NEW_EVENT',
        data: { test: 1 },
      }),
    };

    fakeSocketInstance.onmessage(serverMessage);
    expect(messageData).to.equals('replaced');
  });

  it('Socket delete handler', () => {
    let messageData;
    const messageHandler = () => messageData = 1;

    class FakeSocket {
      constructor() {
        this.onopen = null;
        this.onmessage = null;
        this.onclose = null;
        fakeSocketInstance = this;
      }
    }
    rewire('SockJS', FakeSocket);

    const socket = new AsyncSocket();
    socket.addMessageHandler('NEW_EVENT', messageHandler);
    socket.deleteMessageHandler('NEW_EVENT');

    const serverMessage = {
      data: JSON.stringify({
        event_type: 'NEW_EVENT',
        data: { test: 1 },
      }),
    };

    fakeSocketInstance.onmessage(serverMessage);
    expect(messageData).to.be.undefined;
  });

  it('Socket can`t parse message', () => {
    class FakeSocket {
      constructor() {
        this.onopen = null;
        this.onmessage = null;
        this.onclose = null;
        fakeSocketInstance = this;
      }
    }
    rewire('SockJS', FakeSocket);

    const spy = sinon.spy();
    console.warn = spy;

    const socket = new AsyncSocket();
    expect(socket).to.be.ok;

    const serverMessage = { data: '{"wadf": 3' };
    fakeSocketInstance.onmessage(serverMessage);

    expect(spy.called).to.be.true;
  });
});
