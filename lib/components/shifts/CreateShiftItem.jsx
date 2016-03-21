import { fromJS } from 'immutable';
import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { defineMessages, FormattedMessage } from 'react-intl';

import { ShiftFormModal } from './ShiftFormModal';

const messages = defineMessages({
  createShiftButton: {
    id: 'createShiftItem.createShiftButton',
    defaultMessage: 'New Shift',
  },
});

export class CreateShiftItem extends React.Component {
  static propTypes = {
    createShift: PropTypes.func,
    token: PropTypes.string,
    onShiftCreated: PropTypes.func,
    clearSubmitShiftErrors: PropTypes.func,
    submitShiftErrors: PropTypes.object,
  }

  static defaultProps = {
    createShift: () => {},
    onShiftCreated: () => {},
    clearSubmitShiftErrors: () => {},
    token: '',
    submitShiftErrors: fromJS({}),
  }

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      newShift: {},
    };
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.props.clearSubmitShiftErrors();
    this.setState({ isModalOpen: false });
  }

  handleShiftCreated(data) {
    setTimeout(() => this.props.onShiftCreated(data), 10);
    this.closeModal();
  }

  handleSubmit(newShift) {
    const { token, createShift } = this.props;
    createShift(token, newShift, ::this.handleShiftCreated);
  }

  renderButton() {
    return (
      <FormattedMessage {...messages.createShiftButton}>
        {text => (
          <Button
            type="button"
            bsStyle="primary"
            className="create-shift"
            onClick={::this.openModal}
          >
            {text}
          </Button>
        )}
      </FormattedMessage>
    );
  }

  renderModal() {
    const { token, submitShiftErrors } = this.props;
    return (
      <Modal
        show={this.state.isModalOpen}
        onHide={::this.closeModal}
      >
        <ShiftFormModal
          token={token}
          errors={submitShiftErrors}
          onSubmit={::this.handleSubmit}
        />
      </Modal>
    );
  }

  render() {
    return (
      <span>
        {this.renderButton()}
        {this.renderModal()}
      </span>
    );
  }
}
