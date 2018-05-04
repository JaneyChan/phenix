import axios from 'axios';

export default {
  // 用户登录
  adminLogin(data) {
    return axios.post('/api/user/signIn', data);
  },
};
