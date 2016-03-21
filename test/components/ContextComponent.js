import React, { PropTypes } from 'react';

export class ContextComponent extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  }

  static childContextTypes = {
    store: PropTypes.object,
    history: PropTypes.object,
    socket: PropTypes.object,
  }

  getChildContext() {
    return {
      store: {
        dispatch() {
        },

        subscribe() {
        },

        getState() {
          return {
            application: {
              get() {},
            },
            users: {
              get() {},
            },
            organizations: {
              get() {},
            },
          };
        },
      },
      history: {},
      socket: {
        addMessageHandler() {},
      },
    };
  }

  render() {
    return this.props.children;
  }
}
