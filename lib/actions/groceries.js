import constants from '../constants';

export function addGrocery(title) {
  return {
    type: constants.ADD_GROCERY,
    payload: { title },
  };
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
