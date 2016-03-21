export default {
  put(key, value) {
    window.localStorage.setItem(key, value);
  },

  get(key) {
    return window.localStorage.getItem(key);
  },

  remove(key) {
    return window.localStorage.removeItem(key);
  },

  clear() {
    window.localStorage.clear();
  },
};
