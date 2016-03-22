import React, { PropTypes } from 'react';

export default class GroceriesListJson extends React.Component {
  static propTypes = {
    groceries: PropTypes.object.isRequired,
  }

  render() {
    const { groceries } = this.props;
    const groceriesJSON = JSON.stringify(
      groceries.toJS().map((item) => item.title),
    );
    return (
      <div>
        <input
          type="hidden"
          name="items"
          value={groceriesJSON}
        />
      </div>
    );
  }
}
