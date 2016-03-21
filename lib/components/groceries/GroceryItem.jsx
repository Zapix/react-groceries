import React, { PropTypes } from 'react';
import { Button, ButtonToolbar, Input } from 'react-bootstrap';

export default class GroceryItem extends React.Component {
  static propTypes = {
    grocery: PropTypes.object.Required,
    onSaveGrocery: PropTypes.func,
    onDeleteGrocery: PropTypes.func,
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
    this.props.onSaveGrocery(grocery, this.state.title);
    this.setState({
      editable: false,
    });
  }

  cancel() {
    const { grocery } = this.props;
    this.setState({
      title: grocery.get('title', ''),
      editable: false,
    });
  }

  delete() {
    const { grocery } = this.props;
    this.props.onDeleteGrocery(grocery);
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
            bsSize="small"
            value={this.state.title}
            placeholder="Okänt namn"
            onChange={(e) => this.handleChange(e)}
          />
        </td>
        <td
          className="col-md-8 col-xs-6"
        >
          <ButtonToolbar>
            <Button
              bsStyle="success"
              bsSize="medium"
              onClick={() => this.save()}
            >
              Spara
          </Button>
          <Button
            bsStyle="default"
            bsSize="medium"
            onClick={() => this.cancel()}
          >
            Avbryt
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
          className="col-md-8 col-xs-6 text-right"
        >
          <ButtonToolbar>
            <Button
              bsStyle="default"
              bsSize="small"
              onClick={() => this.edit()}
            >
              Redigera
          </Button>
          <Button
            bsStyle="danger"
            bsSize="small"
            onClick={() => this.delete()}
          >
            Ta bort
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
