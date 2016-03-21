import React, { PropTypes } from 'react';
import { Button, ButtonToolbar, Glyphicon, Input } from 'react-bootstrap';

export default class GroceryItem extends React.Component {
  static propTypes = {
    grocery: PropTypes.object.Required,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
  }

  constructor() {
    super();
    this.state = {
      title: '',
      editable: false,
    };
  }

  isEditable() {
    return this.state.editable;
  }

  edit() {
    const { grocery } = this.props;
    this.setState({
      title: grocery.get('title'),
      editable: true,
    });
  }

  save() {
    const { grocery } = this.props;
    this.props.onSave(grocery, this.state.title);
  }

  cancel() {
    const { grocery } = this.props;
    this.setState({
      title: grocery.get('title', ''),
      editable: false,
    });
  }

  delete() {
    this.props.onDelete();
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  renderEditableFrom() {
    return (
      <tr>
        <td
          className="col-md-8 col-xs-6"
        >
          <Input
            type="text"
            name="title"
            value={this.state.title}
            placeholder="Grocery..."
            onChange={(e) => this.handleChange(e)}
          />
        </td>
        <td
          className="col-md-8 col-xs-6"
        >
          <ButtonToolbar>
            <Button
              bsStyle="primary"
              bsSize="xsmall"
              onClick={() => this.save()}
            >
              <Glyphicon glyph="disk" />&nbsp;save
          </Button>
          <Button
            bsStyle="default"
            bsSize="xsmall"
            onClick={() => this.cancel()}
          >
            cancel
          </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }

  renderMain() {
    const { grocery } = this.props;
    return (
      <tr>
        <td
          className="col-md-8 col-xs-6"
        >
          {grocery.get('title')}
        </td>
        <td
          className="col-md-8 col-xs-6"
        >
          <ButtonToolbar>
            <Button
              bsStyle="primary"
              bsSize="xsmall"
              onClick={() => this.edit()}
            >
              <Glyphicon glyph="pencil" />&nbsp;edit
          </Button>
          <Button
            bsStyle="danger"
            bsSize="xsmall"
            onClick={() => this.delete()}
          >
            <Glyphicon glyph="trash" />&nbsp;edit
          </Button>
          </ButtonToolbar>
        </td>
      </tr>
    );
  }

  render() {
    return this.isEditable() ? this.renderEditableFrom() : this.renderMain();
  }
}
