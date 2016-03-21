import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { GroceriesList, GroceriesPanel } from '../groceries';
import { connect } from 'react-redux';

import {
  addGrocery,
  updateGrocery,
  deleteGrocery,
} from '../../actions/groceries';

const messages = defineMessages({
  welcome: {
    id: 'home.welcome',
    description: 'Welcome message to the user',
    defaultMessage: 'Welcome',
  },
});

function mapStateToProps(state) {
  return {
    groceries: state.groceries.get('groceries', new List()),
  };
}

export class Home extends React.Component {
  static propTypes = {
    groceries: PropTypes.object,
    onAddGrocery: PropTypes.func,
    onSaveGrocery: PropTypes.func,
    onDeleteGrocery: PropTypes.func,
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <GroceriesList
              {...this.props}
            />
            <GroceriesPanel
              {...this.props}
            />
          </div>
        </div>
      </div>
    );
  }
}

export const HomeContainer = connect(
  mapStateToProps,
  {
    onAddGrocery: addGrocery,
    onSaveGrocery: updateGrocery,
    onDeleteGrocery: deleteGrocery,
  }
)(Home);
