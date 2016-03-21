import SockJS from 'sockjs-client';


/**
 * Class for working with incoming and outgoing messages with async remote
 * server.
 * Outgoing messages is a json-object with action_type end data attributes.
 * action_type is String with name of action. data - is object with action data
 * or null
 * Outgoing message example:
 *
 * {
 *   "action_type": "SUBSCRIBE_ORGANIZATION",
 *   "data": {
 *     "organization": 4
 *   }
 * }
 * Incoming message is a json-object with event_type end data attributes.
 * event_type is string, data - is object with event data or null
 * Incoming message example:
 *
 * {
 *   "event_type": "SUBSCRIBED",
 *   "data": {
 *     "organization": 4
 *   }
 * }
 */
export default class AsyncSocket {

  /**
   * constructor - creates connection wtih remote server.
   * Use SockJS for it. Set's onOpen, onClose functions
   * @param {Function} onOpen - function that calls if connection opened
   * @param {Function} onClose - function that calls if connection closed
   */
  constructor(onOpen = () => {}, onClose = () => {}) {
    this.socket = new SockJS(WS_URL);
    this.socket.onopen = onOpen;
    this.socket.onmessage = ::this.handleMessage;
    this.socket.onclose = onClose;
    this._eventHandlers = {};
  }

  get readyState() {
    return this.socket.readyState;
  }

  /**
   * send - method to send action with action data to async server
   * @param {String} actionType - type of sended action
   * @param {*} data - action data
   */
  send(actionType, data) {
    this.socket.send(JSON.stringify({ data, action_type: actionType }));
  }

  /**
   * Set message for incoming message by EVENT_TYPE. for each event
   * we could have only one handler. if handler has been set befor then
   * replace it.
   * @param {String} eventType - type of event from server
   * @param {Function} handler - function to handler data of event
   */
  addMessageHandler(eventType, handler) {
    this._eventHandlers[eventType] = handler;
  }

  /**
   * Delete event handler for eventType.
   * @param {eventType} - string
   */
  deleteMessageHandler(eventType) {
    this._eventHandlers[eventType] = undefined;
  }

  /**
   * handleMessage - handle incoming message from server if message
   * couldn't be parsed log it.
   */
  handleMessage(message) {
    let messageData;
    try {
      messageData = JSON.parse(message.data);
    } catch (e) {
      console.warn(`Can not parse message: ${message.data}`);
      return;
    }
    const handler = this._eventHandlers[messageData.event_type];
    if (handler) {
      handler(messageData.data);
    }
  }
}
