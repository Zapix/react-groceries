/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import { fromJS } from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { defineMessages } from 'react-intl';

import { IntlContextProvider } from './IntlContextProvider';

import {
  ExtendedDateTimeField,
} from '../../lib/components/ExtendedDateTimeField';

const {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
} = ReactTestUtils;

const messages = defineMessages({
  test: {
    id: 'test',
    defaultMessage: 'Test Value',
  },
});

describe('ExtendedDateTimeField component', () => {
  it('Simple render', () => {
    const component = renderIntoDocument(
      <IntlContextProvider>
        <ExtendedDateTimeField
          name="test"
          intlMessage={messages.test}
        />
      </IntlContextProvider>
    );

    const label = findRenderedDOMComponentWithTag(component, 'label');
    const labelDOM = ReactDOM.findDOMNode(label);
    expect(labelDOM.textContent).to.equal('Test Value');

    const input = findRenderedDOMComponentWithTag(component, 'input');
    const inputDOM = ReactDOM.findDOMNode(input);
    const inputName = inputDOM.getAttribute('name');
    expect(inputName).to.equal('test');
  });

  it('Render with errors', () => {
    const errors = fromJS({
      test: [
        'Wrong data',
        'Another error',
      ],
      other: [
        'Not DateTimeField error',
      ],
    });

    const component = renderIntoDocument(
      <IntlContextProvider>
        <ExtendedDateTimeField
          name="test"
          intlMessage={messages.test}
          errors={errors}
        />
      </IntlContextProvider>
    );

    const errorSpan = findRenderedDOMComponentWithClass(
      component,
      'help-block'
    );
    expect(errorSpan).to.be.ok;

    const errorFormGroup = findRenderedDOMComponentWithClass(
      component,
      'has-error'
    );
    expect(errorFormGroup).to.be.ok;
  });
});
