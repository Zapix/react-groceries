import React, { PropTypes } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';


export default class GroceriesPanel {
  static propTypes = {
    onAddGrocery: PropTypes.func,
  }

  static defaultProps = {
    addGrocery: () => {},
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <ButtonToolbar>
            <Button
              onClick={this.props.onAddGrocery}
              bsStyle="primary"
            >
              Lägg till egendom
            </Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}
