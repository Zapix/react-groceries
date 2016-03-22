import React, { PropTypes } from 'react';

import GroceryItem from './GroceryItem';
import GroceriesListJson from './GroceriesListJson';

export default class GroceriesList extends React.Component {
  static propTypes = {
    groceries: PropTypes.object.isRequired,
    onSaveGrocery: PropTypes.func,
    onDeleteGrocery: PropTypes.func,
  }

  renderListOfGroceries() {
    const { groceries, onSaveGrocery, onDeleteGrocery } = this.props;
    return (
      <tbody>
        {groceries.map((grocery) => (
          <GroceryItem
            key={grocery.get('id')}
            {...{ grocery, onSaveGrocery, onDeleteGrocery }}
          />
        ))}
      </tbody>
    );
  }

  render() {
    return (
      <div>
        <table className="table table-hover small">
          <thead>
            <tr>
              <th
                className=""
              >
                Egendomar
              </th>
              <th
                className=""
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
