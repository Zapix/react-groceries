import { fromJS } from 'immutable';

import createReducer from '../utils/create-reducer';

const initialState = fromJS({
  locale: 'en',
});

const actionHandlers = {};

export default createReducer(initialState, actionHandlers);
