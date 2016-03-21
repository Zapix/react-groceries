import { fromJS } from 'immutable';
import reducer from '../../lib/reducers/groceries';
import * as constants from '../../lib/constants';

import checkAction from './checkAction';

describe('Groceries Reducers', () => {
  function checkGroceriesReducer(currentState, action, expectedState) {
    checkAction(reducer, currentState, action, expectedState);
  }

  it('Add first grocery', () => {
    checkGroceriesReducer(
      {},
      { type: constants.ADD_GROCERY },
      {
        counter: 1,
        groceries: [
          { id: 0, title: 'new item' },
        ],
      }
    );
  });

  it('Add one more element', () => {
    checkGroceriesReducer(
      {
        counter: 5,
        groceries: [
          { id: 2, title: 'test' },
        ],
      },
      { type: constants.ADD_GROCERY },
      {
        counter: 6,
        groceries: [
          { id: 2, title: 'test' },
          { id: 5, title: 'new item' },
        ],
      }
    );
  });

  it('Update grocery', () => {
    checkGroceriesReducer(
      {
        counter: 2,
        groceries: [
          { id: 0, title: 'test' },
          { id: 2, title: '' },
        ],
      },
      {
        type: constants.UPDATE_GROCERY,
        payload: {
          grocery: fromJS({ id: 2, title: '' }),
          title: 'new item',
        },
      },
      {
        counter: 2,
        groceries: [
          { id: 0, title: 'test' },
          { id: 2, title: 'new item' },
        ],
      }
    );
  });

  it('Delete grocery', () => {
    checkGroceriesReducer(
      {
        counter: 6,
        groceries: [
          { id: 0, title: 'test' },
          { id: 2, title: '' },
          { id: 5, title: 'test another' },
        ],
      },
      {
        type: constants.DELETE_GROCERY,
        payload: {
          grocery: fromJS({ id: 2, title: '' }),
        },
      },
      {
        counter: 6,
        groceries: [
          { id: 0, title: 'test' },
          { id: 5, title: 'test another' },
        ],
      }
    );
  });
});
