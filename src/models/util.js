// import Api from '../lib/api';

export default {
  namespace: 'util',

  state: {
    notification: '',
    lastChange: '',
  },

  effects: (dispatch) => ({
    async alert(a) {
      await new Promise((r) =>
        setTimeout(() => {
          this.alert_reducer(a);
          r();
        }, 2000),
      );
    },
  }),

  reducers: {
    alert_reducer(state, payload) {
      return {
        ...state,
        notification: payload,
        lastChange: Date.now(),
      };
    },
  },
};
