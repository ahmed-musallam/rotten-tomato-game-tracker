// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import GameStore from '@/plugins/GameStore'
import PlayerModal from '@/components/PlayerModal'
import MovieModal from '@/components/MovieModal'
import GameCard from '@/components/GameCard'

Vue.config.productionTip = false
Vue.use(GameStore)
Vue.component('player-modal', PlayerModal)
Vue.component('movie-modal', MovieModal)
Vue.component('game-card', GameCard)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
