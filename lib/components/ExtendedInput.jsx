import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';


export class ExtendedInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    intlMessage: PropTypes.object.isRequired,
    errors: PropTypes.object,
    children: PropTypes.element,
  }

  hasError() {
    const { name, errors } = this.props;
    return errors && errors.has(name);
  }

  renderErrors() {
    const { name, errors } = this.props;
    const inputErrors = errors.get(name);

    return (
      <div>
        {inputErrors.map((item, idx) => <div key={`error${idx}`}>{item}</div>)}
      </div>
    );
  }

  render() {
    return (
      <FormattedMessage {...this.props.intlMessage}>
        {text => (
          <Input
            {...this.props}
            label={text}
            bsStyle={this.hasError() ? 'error' : null}
            help={this.hasError() ? this.renderErrors() : null}
          >
            {this.props.children}
          </Input>
        )}
      </FormattedMessage>
    );
  }
}
