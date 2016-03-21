import '../assets/stylesheets/index.less';

import React, { PropTypes } from 'react';
import { Route } from 'react-router';
import { ReduxRouter } from 'redux-router';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { fromJS } from 'immutable';
import configureStore from './utils/configure-store';
import components from './components';
import i18n from './i18n';


const {
  Application,
  Home,
} = components;

const initialState = {
  application: fromJS({
    locale: 'en-us',
  }),
};

export const store = configureStore(initialState);

function getRootChildren(props) {
  const intlData = {
    locale: props.application.get('locale'),
    messages: i18n[props.application.get('locale')],
  };
  return [
    <IntlProvider key="intl" {...intlData}>
      <ReduxRouter>
        <Route component={Application}>
          <Route path="/" component={Home} />
        </Route>
      </ReduxRouter>
    </IntlProvider>,
  ];
}

class Root extends React.Component {
  static propTypes = {
    application: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div id="react-app">{getRootChildren(this.props)}</div>
    );
  }
}

export const RootContainer = connect(
  ({ application }) => { return { application }; }
)(Root);
