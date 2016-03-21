import { fromJS, List } from 'immutable';

import constants from '../constants';
import createReducer from '../utils/create-reducer';

const initialState = fromJS({
});

function addGrocery(state) {
  const groceries = state.get('groceries', new List());
  const counter = state.get('counter', 0);
  return state.merge(fromJS({
    counter: counter + 1,
    groceries: groceries.push(fromJS({ id: counter, title: 'new item' })),
  }));
}

function updateGrocery(state, action) {
  let groceries = state.get('groceries');
  const { title, grocery } = action.payload;
  const groceryId = grocery.get('id');
  groceries = groceries.map((item) => {
    return groceryId === item.get('id') ? item.merge(fromJS({ title })) : item;
  });
  return state.set('groceries', groceries);
}

function deleteGrocery(state, action) {
  let groceries = state.get('groceries');
  const { grocery } = action.payload;
  const groceryId = grocery.get('id');
  groceries = groceries.filter((item) => groceryId !== item.get('id'));
  return state.set('groceries', groceries);
}

const actionHandlers = {
  [constants.ADD_GROCERY]: addGrocery,
  [constants.UPDATE_GROCERY]: updateGrocery,
  [constants.DELETE_GROCERY]: deleteGrocery,
};

export default createReducer(initialState, actionHandlers);
