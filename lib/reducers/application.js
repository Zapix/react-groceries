import { fromJS, List } from 'immutable';

import constants from '../constants';
import createReducer from '../utils/create-reducer';

const initialState = fromJS({
  locale: 'en',
});

const actionHandlers = {};

export default createReducer(initialState, actionHandlers);
