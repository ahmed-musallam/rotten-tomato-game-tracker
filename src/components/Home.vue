<template>
  <div>
    <div class="container">
      <h1 class="no-margin-bottom">All Games <button class="btn btn-primary" v-if="gameIds.length" @click="createNewGame">New Game</button></h1>
      <blockquote class="no-margin-top">*All data is stored in <a href="https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage">LocalStorage</a></blockquote>
      <div class="columns" v-if="gameIds.length">
        <div class="column col-4 col-lg-4 col-md-6 col-sm-12 col-xs-12"
            v-for="(gameId, gameIndex) in gameIds" :key="gameIndex">
          <game-card class="m-1" :gameId="gameId" v-on:removegame="handleRemoveGame"></game-card>
        </div>
      </div>
      <div class="empty" v-if="!gameIds.length">
        <div class="empty-icon">
          <span class="icon emoji">😞</span>
        </div>
        <p class="empty-title h5">You have no Gmaes</p>
        <div class="empty-action">
          <button class="btn btn-primary" @click="createNewGame">Create a New Game!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-margin-bottom {
  margin-bottom: 0;
}
.no-margin-top {
  margin-top: 0;
}

.emoji {
  text-indent: initial;
  font-size: 3em;
}
</style>

<script>
import Vue from 'vue'
export default {
  name: 'home',
  methods: {
    handleRemoveGame: function (data) {
      Vue.removeGame(data.id)
      this.gameIds = Vue.getGameIds()
    },
    createNewGame: function () {
      var idNums = this.gameIds.map(id => parseInt(id))
      var newId
      if (idNums.length === 0) newId = 1
      else {
        var max = Math.max(...idNums)
        newId = max ? max + 1 : 1
      }
      this.$router.push({ path: 'game/' + newId })
    }
  },
  data () {
    var _gameIds = Vue.getGameIds().slice(0)
    return {
      gameIds: _gameIds
    }
  }
}
</script>
