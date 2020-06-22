import {
  login
} from '@/api/user'

import router from '@/router'

const state = {
  Token: null,
  username: null
}

const mutations = {
  setToken(state, Token) {
    state.Token = Token;
    sessionStorage.setItem("Token", Token);
  },
  setName(state, name) {
    state.username = name;
  },
  removeToken(state) {
    sessionStorage.removeItem("Token");
    router.push({
      path: '/login'
    });
  }
}

const actions = {
  login(context, data) {
    let {
      username,
      password
    } = data;
    username = username.trim();
    password = password.trim();

    return new Promise((resolve, reject) => {
      login({
        username,
        password
      }).then(res => {
        // vuex记录 Token、username
        // 本地存储Token
        context.commit('setToken', res.Token);
        context.commit('setName', username);
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}