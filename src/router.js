import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        index: 0,
      },
      component: () => import('./views/Home')
    },
    {
      path: '/article/:id',
      name: 'article',
      meta: {
        index: 1,
      },
      component: () => import('./views/Article')
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/comments',
      name: 'comments',
      meta: {
        index: 2,
      },
      component: () => import('./views/Comments')
    },
    {
      path: '/writeboard',
      name: 'writeboard',
      meta: {
        index: 3,
      },
      component: () => import('./views/Writeboard')
    },
  ],

  //切换页面时带来的滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ x: 0, y: 0 })
        }, 300)
      })
    }
  },
})