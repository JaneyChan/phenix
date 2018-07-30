import Vue from 'vue'
import Router from 'vue-router'
import Article from '@/components/article'
import List from '@/components/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    }
  ]
})
