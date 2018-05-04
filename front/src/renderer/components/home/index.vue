<template>
  <div class="container-wrap">
    <div class="slide-box">
      <div class="logo"></div>
      <div class="item-icon article"></div>
      <div class="item-icon category"></div>
      <div class="item-icon tag"></div>
      <div class="item-icon user"></div>
      <div class="item-icon login-out"></div>
    </div>
    <div class="content-box">
      <v-main></v-main>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import Main from '../main';


export default {
  name: 'Home',
  components: {
    'v-main': Main,
  },
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

.container-wrap {
  width: 100%;
  height: 100%;
  display: flex;
}
.slide-box {
  position: relative;
  flex-shrink: 0;
  width: 90px;
  height: 100%;
  background: #f7f7f7;
  border-right: 1px solid #eaeaea;
  .logo {
    background: url('../../assets/me_logo.png') center / contain no-repeat;
    padding: 30px 0 40px 0;
    margin: 0 auto;
    width: 60px;
    height: 40px;
    border-bottom: 1px solid #eaeaea;
  }
  .item-icon {
    cursor: pointer;
    border: 1px solid $theme-color;
    width: 50px;
    height: 50px;
    margin: 35px auto 0;
    border-radius: 50%;
    background:  #fff center / contain no-repeat;
    background-size: 20px;
    &.article {
      background-image: url('../../assets/tab_icon_article.png');
    }
    &.category {
      background-image: url('../../assets/tab_icon_category.png');
    }
    &.tag {
      background-image: url('../../assets/tab_icon_tag.png');
    }
    &.user {
      background-image: url('../../assets/tab_icon_user.png');
    }
    &.login-out {
      position: absolute;
      left: 19px;
      bottom: 30px;
      background-image: url('../../assets/tab_icon_loginout.png');
    }
  }
}
.content-box {
  width: 100%;
  height: 100%;
  background: #fff;
}

</style>
