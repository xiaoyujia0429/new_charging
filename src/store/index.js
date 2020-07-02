import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import user from "./modules/user";
import newherder from "./modules/newherder";
import getters from "./getters";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    newherder
  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          // 只储存state中的app这个js的数据
          app: val.app
        };
      }
    })
  ]
});

export default store;
