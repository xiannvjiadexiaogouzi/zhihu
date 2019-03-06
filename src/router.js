import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Article from './views/Article'
import Comments from './views/Comments'
import Writeboard from './views/Writeboard'
// import  from './views/eg'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      meta: {
        index: 0,
      },
      component: Home
    },
    {
      path: '/article/:id',
      name: 'article',
      meta: {
        index: 1,
      },
      component: Article
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
      component: Comments
    },
    {
      path: '/writeboard',
      name: 'writeboard',
      meta: {
        index: 3,
      },
      component: Writeboard
    },
  ],
  //切换页面时带来的滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (!savedPosition) {
      setTimeout(() => {
        return {
          x: 0,
          y: 0
        }
      }, 500);
    } else {
      return savedPosition
    }
  },
})