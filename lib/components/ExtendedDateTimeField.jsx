import moment from 'moment';
import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import { FormattedMessage } from 'react-intl';
import { DateTimePicker } from 'react-widgets';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import classNames from 'classnames';
import { formats } from '../settings';

momentLocalizer(moment);

export class ExtendedDateTimeField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    intlMessage: PropTypes.object.isRequired,
    errors: PropTypes.object,
    initDate: PropTypes.string,
    defaultText: PropTypes.string,
    mode: PropTypes.string,
  }

  static defaultProps = {
    errors: fromJS({}),
    initDate: undefined,
    defaultText: undefined,
    mode: undefined,
  }

  getErrors() {
    const { name, errors } = this.props;
    return errors.get(name);
  }

  hasError() {
    return !!this.getErrors();
  }

  renderErrors() {
    if (!this.hasError()) {
      return null;
    }

    const fieldErrors = this.getErrors();
    return (
      <span className="help-block">
        {fieldErrors.map((item, idx) => <div key={`error${idx}`}>{item}</div>)}
      </span>
    );
  }

  render() {
    const { name, intlMessage, initDate, mode } = this.props;
    const inputProps = {
      name,
      id: name,
    };

    const classes = classNames({
      'form-group': true,
      'has-error': this.hasError(),
    });

    const { inner, display } = formats[mode || 'datetime'];
    let dateValue = null;
    if (initDate) {
      dateValue = moment(initDate, inner).toDate();
    }

    return (
      <FormattedMessage {...intlMessage}>
        {text => (
          <div className={classes}>
            <label className="control-label" htmlFor={name}>{text}</label>
            <DateTimePicker
              format={display}
              value={dateValue}
              {...inputProps}
              {...this.props}
            />
            {this.renderErrors()}
          </div>
        )}
      </FormattedMessage>
    );
  }
}
