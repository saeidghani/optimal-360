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
      const { errors, message } = error?.response?.data;

      if (errors) {
        let description = '';
        Object.values(error.response.data.errors).forEach((err) => {
          description = err;
        });

        this.alert_reducer({
          message,
          description,
          type: 'error',
        });

        return;
      }
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
