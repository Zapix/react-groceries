import React, { PropTypes } from 'react';
import { Alert } from 'react-bootstrap';
import { fromJS } from 'immutable';

export class CommonErrors extends React.Component {
  static propTypes = {
    errors: PropTypes.object,
  }

  static defaultProps = {
    errors: fromJS({}),
  }

  render() {
    return (
      <div>
        {this.props.errors.get('__all__', []).map(
          (value, idx) => <Alert key={idx} bsStyle="warning">{value}</Alert>
        )}
        {this.props.errors.get('non_field_errors', []).map(
          (value, idx) => <Alert key={idx} bsStyle="warning">{value}</Alert>
        )}
      </div>
    );
  }
}
