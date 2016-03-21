import constants from '../constants';

export function addGrocery() {
  return { type: constants.ADD_GROCERY };
}

export function updateGrocery(grocery, title) {
  return {
    type: constants.UPDATE_GROCERY,
    payload: { grocery, title },
  };
}

export function deleteGrocery(grocery) {
  return {
    type: constants.DELETE_GROCERY,
    payload: { grocery },
  };
}
