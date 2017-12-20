import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/index'
import Search from '@/page/index/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
