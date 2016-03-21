import React, { PropTypes } from 'react';

export default class GroceriesListJson extends React.Component {
  static propTypes = {
    groceries: PropTypes.array.Required,
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
          value={groceriesJSON}
        />
      </div>
    );
  }
}
