import React, { PropTypes } from 'react';
import { IntlProvider } from 'react-intl';

import { ContextComponent } from './ContextComponent';
import * as i18n from '../../lib/i18n';

const intlData = {
  locale: 'en',
  messages: i18n.en,
};

export class IntlContextProvider extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  }

  render() {
    return (
      <IntlProvider key="intl" {...intlData}>
        <ContextComponent>{this.props.children}</ContextComponent>
      </IntlProvider>
    );
  }
}
