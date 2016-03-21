import React, { PropTypes } from 'react';
import { NavigationContainer } from './Navigation';
import Footer from './Footer';
import DisplayError from './DisplayError';
import AsyncSocket from '../utils/AsyncSocket';

export default class Application extends React.Component {

  static propTypes = {
    children: PropTypes.any,
  }

  static childContextTypes = {
    socketReady: PropTypes.number,
    socket: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.state = {
      isMenuActive: false,
      socketReady: 0,
    };
    this.socket = new AsyncSocket(
      () => this.setState({ socketReady: 1 }),
      () => this.socketClose({ socketReady: 0 })
    );
  }

  getChildContext() {
    return {
      socketReady: this.state.socketReady,
      socket: this.socket,
    };
  }

  handleMenuClick(evt) {
    evt.preventDefault();
    this.setState({ isMenuActive: !this.state.isMenuActive });
  }

  render() {
    const { isMenuActive } = this.state;
    const activeClass = isMenuActive ? 'active' : '';

    return (
      <div id="layout" className={activeClass}>
        <div
          id="wrap"
        >
          <NavigationContainer />
          <div
            id="main"
            className="container container-fluid"
          >
            <DisplayError />
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
