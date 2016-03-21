import React from 'react';
import { fromJS } from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { GroceriesList, GroceriesPanel } from '../groceries';

const messages = defineMessages({
  welcome: {
    id: 'home.welcome',
    description: 'Welcome message to the user',
    defaultMessage: 'Welcome',
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
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <GroceriesList
              groceries={fromJS([
                { title: 'Test item' },
                { title: 'Test item 2' },
              ])}
            />
            <GroceriesPanel
              onAddGrocery={() => console.log('add')}
            />
          </div>
        </div>
      </div>
    );
  }
}
