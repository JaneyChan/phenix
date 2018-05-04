<template>
  <div class="container">
    <div class="main-box">
      <div class="head-box"></div>
      <div class="input-field">
        <i class="input-icon user"></i>
        <input type="text" v-model="username" placeholder="用户名" />
      </div>
      <div class="input-field">
        <i class="input-icon password"></i>
        <input type="text" v-model="password" placeholder="密码" />
      </div>
      <button class="login-btn" @click="login">登录</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      axios.post('/api/user/signIn', { username: this.username, password: this.password });
      axios.get('/api/user/list');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/_global.scss';

.container {
  min-height: 100%;
  background: #f0f2f5;
  .main-box {
    box-sizing: border-box;
    max-width: 368px;
    margin: 0 auto;
    padding: 20vh 15px 40px 15px;
  }
  .head-box {
    height: 50px;
    background: url('../../assets/me_logo.png') center / contain no-repeat;
    margin-bottom: 35px;
  }
  .input-field {
    position: relative;
    margin-bottom: 20px;
    input {
      box-sizing: border-box;
      padding: 0 12px 0 36px;
      width: 100%;
      height: 44px;
      background: #fff;
      border: 1px solid #e6e6e8;
      border-radius: 4px;
      &:focus {
        border: 1px solid $theme-color;
      }
    }
    .input-icon {
      position: absolute;
      top: 15px;
      left: 12px;
      width: 16px;
      height: 16px;
      &.user {
        background: url('../../assets/icon_login_user.png') center / contain no-repeat;
      }
      &.password {
        background: url('../../assets/icon_login_pwd.png') center / contain no-repeat;
      }
    }
  }
  .login-btn {
    width: 100%;
    height: 44px;
    color: #fff;
    background: $theme-color;
    border-radius: 4px;
    &:hover {
      background: $theme-color-dark;
    }
  }
}

@media (min-width: 768px) {
  .container {
    background-image: url('../../assets/login_bg.svg');
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
  }
}

</style>
