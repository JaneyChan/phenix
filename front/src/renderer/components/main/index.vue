<template>
  <div class="main">
      <div class="title-wrap"></div>
      <div class="article-content"></div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      username: '',
      password: '',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../styles/_global.scss";

.main {
  height: 100%;
  display: flex;
  .title-wrap {
    flex-shrink: 0;
    width: 220px;
    height: 100%;
    border-right: 1px solid #eaeaea;
    background: red;
  }
  .article-content {
    width: 100%;
    height: 100%;
    background: green;
  }
}
</style>
