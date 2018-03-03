<template>
  <div>
    <div class="container">
      <h1 class="no-margin-bottom">All Games <button class="btn btn-primary" @click="createNewGame">New Game</button></h1>
      <blockquote class="no-margin-top">*Data is stored in localStorage</blockquote>
      <div class="columns">
        <div class="column col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12"
            v-for="(gameId, gameIndex) in gameIds" :key="gameIndex">
          <game-card class="m-1" :gameId="gameId" v-on:removegame="handleRemoveGame"></game-card>
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
