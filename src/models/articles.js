// import Api from '../lib/api';

export default {
  namespace: 'articles',

  state: {},

  effects: (dispatch) => ({}),

  reducers: {
    replaceUserInput(state, payload) {
      return {
        ...state,
        userInput: payload,
      };
    },
  },
};
