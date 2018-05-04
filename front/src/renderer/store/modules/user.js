import * as types from './../mutation_types';
import L from '../../axios/login';

const state = {
  user: {},
};
const mutations = {
  [types.LOGIN_USER_SUCCESS]: (sta, val) => {
    state.user = val;
  },
  [types.LOGIN_USER_FAIL]: () => {
    state.user = {};
  },
};

const actions = {
  userLogin({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      L.adminLogin({ username, password })
        .then((res) => {
          // 登录成功
          commit(types.LOGIN_USER_SUCCESS);
          resolve(res);
        })
        .catch((err) => {
          commit(types.LOGIN_USER_FAIL);
          reject(err);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
