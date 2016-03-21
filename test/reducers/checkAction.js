import { expect } from 'chai';
import { fromJS } from 'immutable';

/**
 * checks reducer action handling
 * @param  {Function} reducer - checking reducer
 * @param  {*} currentState - current application state as JS object
 * @param  {*} action - action object
 * @param  {*} expected action as js object
 */
export default function (reducer, currentState, action, expectedState) {
  const nextState = reducer(fromJS(currentState), action);
  expect(nextState).to.equal(fromJS(expectedState));
}
