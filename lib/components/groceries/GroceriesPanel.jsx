import React, { PropTypes } from 'react';
import { Input, Button } from 'react-bootstrap';


export default class GroceriesPanel extends React.Component {
  static propTypes = {
    onAddGrocery: PropTypes.func,
  }

  static defaultProps = {
    onAddGrocery: () => {},
  }

  constructor() {
    super();
    this.state = {
      newGrocery: {},
    };
  }

  handleFormChange(evt) {
    evt.preventDefault();
    const { newGrocery } = this.state;
    const { name, value } = evt.target;
    newGrocery[name] = value;
    this.setState({ newGrocery });
  }

  addGrocery(evt) {
    evt.preventDefault();
    const { newGrocery } = this.state;
    this.props.onAddGrocery(newGrocery.title);
    this.setState({ newGrocery: {} });
  }

  render() {
    const { newGrocery } = this.state;
    return (
      <form
        onChange={(evt) => this.handleFormChange(evt)}
        onSubmit={(evt) => this.addGrocery(evt)}
      >
        <div className="row">
          <div className="col-md-8 col-xs-6">
            <Input
              type="text"
              name="title"
              placeholder="Egendom... "
              value={newGrocery.title}
            />
          </div>
          <div className="col-md-4 col-xs-6">
            <Button
              type="submit"
              bsStyle="primary"
            >
              Lägg till egendom
            </Button>
          </div>
        </div>
      </form>
    );
  }
}
