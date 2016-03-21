import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { hideError } from '../actions/application';

class DisplayError extends React.Component {

  static propTypes = {
    hideError: PropTypes.func.isRequired,
    error: PropTypes.object,
  }

  render() {
    if (!this.props.error) {
      return null;
    }

    return (
      <div className="error-message">
        <div>
          <button
            onClick={this.props.hideError}
            type="button"
            className="close-button"
          >
            <i className="fa fa-times-circle" />
          </button>
          <p>{this.props.error.message}</p>
          <pre>
            <code>{JSON.stringify(this.props.error.body, null, 2)}</code>
          </pre>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ application }) => ({ error: application.error }),
  { hideError }
)(DisplayError);
