export default {
  namespace: 'util',

  state: {
    notification: '',
    lastChange: '',
  },

  effects: () => ({
    async alert(payload) {
      this.alert_reducer(payload);
    },

    async errorHandler(error) {
      this.alert_reducer(error);
    },

    async clearNotifications() {
      this.alert_reducer('');
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
