import React, { PropTypes } from 'react';
import { ExtendedInput } from './ExtendedInput';
import timezones from '../timezones';

export class TimeZoneSelect extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    intlMessage: PropTypes.object,
    errors: PropTypes.object,
  }

  render() {
    return (
      <ExtendedInput
        type="select"
        {...this.props}
      >
        <option key="none" value={null}>Select timezone...</option>
        {timezones.map(
          (item, idx) => (
            <option key={'timezone' + idx } value={item}>{item}</option>
          )
        )}
      </ExtendedInput>
    );
  }
}
