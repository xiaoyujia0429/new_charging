const state = {
  loading: false
};

const mutations = {
  SET_Loading: (state, loading) => {
    state.loading = loading;
  }
};

const actions = {
  toggleloading({ commit }, loading) {
    commit("SET_Loading", loading);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
