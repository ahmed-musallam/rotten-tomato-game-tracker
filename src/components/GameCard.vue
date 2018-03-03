<template>
<div class="card">
  <div class="card-header">
    <div class="card-title h5">Rotten Tomatoes Game</div>
    <div class="card-subtitle text-gray">Game Id: {{gameId}}</div>
  </div>
  <div class="card-body">
    <div class="player">
      <b>Players:</b>
      <div class="chip" v-for="(player, index) in game.players" :key="index">
        <figure class="avatar avatar-sm" v-bind:data-initial="getInitials(player.name)" style="background-color: #5755d9;"></figure>
        {{player.name}}
      </div>
    </div>
     <div>
      <b>Movies:</b>
      <div class="chip" v-for="(movie, movIndex) in game.movies" :key="movIndex">
        <figure class="avatar avatar-sm" v-bind:data-initial="getInitials(movie.name)" style="background-color: #5755d9;"></figure>
        {{movie.name}}
      </div>
    </div>
  </div>
  <div class="card-footer">
    <router-link class="btn btn-primary" v-bind:to="route">Go to Game</router-link>
    <button class="btn" @click="removeGame">Delete Game</button>
  </div>
</div>
</template>

<style scoped>
  .player{
    margin-bottom: 0.5em;
  }
</style>

<script>
import Vue from 'vue'
import Game from '@/classes/Game'
export default {
  name: 'game-card',
  props: ['gameId'],
  methods: {
    removeGame: function () {
      this.$emit('removegame', {id: this.gameId})
    }
  },
  data () {
    var _game = Vue.getGame(this.gameId) || {}
    Object.setPrototypeOf(_game, Game.prototype)
    var _route = '/game/' + this.gameId
    return {
      game: _game,
      route: _route,
      getInitials: function (name) {
        if (!name) return ''
        let fName = ''
        let lName = ''
        let words = name.split(' ').filter(w => !!w)

        if (words.length === 1) {
          fName = words[0]
          if (fName.length > 1) return fName.substring(0, 2)
          else return fName
        } else {
          fName = words.shift()
          lName = words.pop()
          return fName[0] + lName[0]
        }
      }
    }
  }
}
</script>
