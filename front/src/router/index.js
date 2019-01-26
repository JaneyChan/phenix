import Vue from 'vue'
import Router from 'vue-router'
import Article from '@/components/article'
import Home from '@/components/home'
import Category from '@/components/category'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/article/:routeName',
      name: 'Article',
      component: Article
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    }
  ]
})
