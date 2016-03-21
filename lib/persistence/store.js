import constants from '../constants';
import storage from './storage';

export default function persistenceHandler(next) {
  return (reducer, initialState) => {
    const store = next(reducer, initialState);

    return Object.assign({}, store, {
      dispatch(action) {
        if (!action) {
          return { type: constants.EMPTY_ACTION };
        }

        store.dispatch(action);

        storage.put('locale', store.getState().application.get('locale'));

        if (action.type === constants.LOGGED_IN) {
          storage.put('token', action.token);
        }

        if (action.type === constants.LOG_OUT) {
          storage.remove('token');
          storage.remove('user');
        }

        return action;
      },
    });
  };
}
