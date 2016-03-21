import React, { PropTypes } from 'react';

import GroceryItem from './GroceryItem';
import GroceriesListJson from './GroceriesListJson';

export default class GroceriesList extends React.Component {
  static propTypes = {
    groceries: PropTypes.object.Required,
    onSaveGrocery: PropTypes.func,
    onDeleteGrocery: PropTypes.func,
  }

  renderListOfGroceries() {
    const { groceries, onSaveGrocery, onDeleteGrocery } = this.props;
    return (
      <tbody>
        {groceries.map((grocery) => (
          <GroceryItem {...{ grocery, onSaveGrocery, onDeleteGrocery }}/>
        ))}
      </tbody>
    );
  }

  render() {
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th
                className="col-md-8 col-xs-6"
              >
                Items
              </th>
              <th
                className="col-md-4 col-xs-6"
              >
                &nbsp;
              </th>
            </tr>
          </thead>
            {this.renderListOfGroceries()}
        </table>
        <GroceriesListJson {...this.props} />
      </div>
    );
  }
}
