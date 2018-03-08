import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Game from '@/components/Game'
import Motivation from '@/components/Motivation'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Rotten Tomatoe',
      component: Home
    },
    {
      path: '/motivation',
      name: 'Motivation',
      component: Motivation
    },
    {
      path: '/game/:id',
      component: Game
    }
  ]
})
