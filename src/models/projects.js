import axios from '../lib/api';
import actionWapper from '../lib/actionWapper';

export default {
  namespace: 'projects',

  state: {
    activeProjects: '',
  },

  effects: (dispatch) => ({
    async fetchActiveProjects(query) {
      // const newQuery = query || '?page_size=10&page_number=1&status=active';
      const newQuery = query || '?page_size=10&page_number=1';

      return actionWapper(async () => {
        const res = await axios({
          method: 'get',
          url: `/super-user/projects${newQuery}`,
        });

        this.fetchActiveProjects_reducer(res?.data);

        return res;
      }, dispatch.util.errorHandler);
    },
  }),

  reducers: {
    fetchActiveProjects_reducer: (state, payload) => ({
      ...state,
      activeProjects: payload,
    }),
  },
};
