import { login, logout, getInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const state = {
  token: getToken(),
  name: ""
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  }
};

const actions = {
  // 登录
  Login({ commit }, userInfo) {
    // console.log(userInfo);
    const username = userInfo.username.trim();
    const password = userInfo.password;

    return new Promise((resolve, reject) => {
      login(username, password)
        .then(res => {
          // console.log(res, "res");
          setToken(res.token);
          commit("SET_TOKEN", res.token);
          resolve();
        })
        .catch(error => {
          console.log(error, "error");
          reject(error);
        });
    });
  },

  // 获取用户信息
  GetInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(res => {
          const user = res.user;

          commit("SET_NAME", user.userName);

          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 退出系统
  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          removeToken();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
