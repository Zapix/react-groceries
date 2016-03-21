import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import className from 'classnames';

function mapStateToProps(state) {
  return {
    location: state.router.location,
  };
}

export class Navigation extends React.Component {
  static propTypes = {
    location: PropTypes.object,
  }

  isPathEquals(path) {
    return (
      this.props.location.pathname &&
      this.props.location.pathname === path
    );
  }

  isPathIncludes(path) {
    return (
      this.props.location.pathname &&
      this.props.location.pathname.includes(path)
    );
  }

  renderNav() {
    return (
      <Nav
        className="navbar-right"
      >
        <LinkContainer to="/">
          <NavItem
            className={className({
              'active': this.isPathEquals('/'),
            })}
          >
            Home
          </NavItem>
        </LinkContainer>
      </Nav>
    );
  }

  render() {
    return (
      <Navbar
        className="navbar navbar-default navbar-fixed-top"
      >
        <Navbar.Header>
          <LinkContainer to="/">
            <Navbar.Brand>
              Groceries
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.renderNav()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export const NavigationContainer = connect(mapStateToProps)(Navigation);
