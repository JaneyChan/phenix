<template>
  <div id="app">
    <v-header></v-header>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  name: 'App',
  components: {
    'v-header': Header
  }
}
</script>

<style>
#app {
  position: relative;
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 980px;
  margin: 0 auto;
}
.header-wrapper {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  max-width: 980px;
  margin: 0 auto;
  padding: 10px 40px;
  background: #fffdf5;
}
.article-wrapper {
  max-width: 980px;
  margin: 60px 0;
  padding: 0 1em;
}
</style>
