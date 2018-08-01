import Vue from 'vue'
import Router from 'vue-router'
import Article from '@/components/article'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    }
  ]
})
