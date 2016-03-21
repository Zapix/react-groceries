import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  login: {
    id: 'home.login',
    description: 'Ask user to login',
    defaultMessage: 'Login or sign up above.',
  },
  welcome: {
    id: 'home.welcome',
    description: 'Welcome message to the user',
    defaultMessage: 'Welcome',
  },
  attention: {
    id: 'home.attention',
    description: 'Get user attention about sign in in for this company',
    defaultMessage: 'If you\'re joining an existing company, ' +
    'make sure you know the company ID ahead of time.',
  },
  tip: {
    id: 'home.tip',
    description: 'Tip for getting info',
    defaultMessage: 'You can get it from your manager or ' +
    'whomever does your scheduling.',
  },
});


export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <FormattedMessage {...messages.welcome}>
            {text => <h1>{text}</h1>}
          </FormattedMessage>
        </div>
        <div className="text-center">
          <div className="content">
            <FormattedMessage {...messages.login}>
              {text => <p>{text}</p>}
            </FormattedMessage>
            <FormattedMessage {...messages.attention}>
              {text => <p>{text}</p>}
            </FormattedMessage>
            <FormattedMessage {...messages.tip}>
              {text => <p>{text}</p>}
            </FormattedMessage>
          </div>
        </div>
      </div>
    );
  }
}
