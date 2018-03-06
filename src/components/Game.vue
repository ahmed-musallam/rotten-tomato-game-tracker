<template>
  <div class="container">
    <h1>Game on!</h1>
    <button class="btn btn-primary" @click="playerModalActive = true">Add Player</button>
    <button class="btn btn-primary" @click="movieModalActive = true">Add Movie</button>
    <table class="table table-striped table-hover" v-if="(game.players && game.players.length) || (game.movies && game.movies.length)">
      <thead>
        <tr>
        <th>Movie Name</th>
        <th>Movie's Score</th>
        <th v-for="(player, playerIndex) in game.players" :key="playerIndex">{{player.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie, movieIndex) in game.movies" :key="movieIndex">
          <td>{{movie.name}}</td>
          <td>{{movie.score}}</td>
          <td v-for="(player, playerIndex) in game.players" :key="playerIndex">
            <div class="view" v-if="!isEdit(playerIndex,movieIndex)">
              <input class="form-input score" disabled type="text" :value="player.guesses[movieIndex]"/>
              <button class="btn btn-md tooltip" data-tooltip="Edit" @click="editScore(playerIndex, movieIndex, $event)">
                <i class="icon icon-edit"></i>
              </button>
              <div :class="{visible: !isEdit(playerIndex,movieIndex) && gotBonusScore(playerIndex, movieIndex)}" class="bonus tooltip" data-tooltip="5 point bonus!">🎉</div>
            </div>
            <div class="edit" v-if="isEdit(playerIndex,movieIndex)">
              <input class="form-input score" type="number" min='0' max='100' :value="player.guesses[movieIndex]"/>
              <button class="btn btn-md tooltip" data-tooltip="Save" @click="saveScore(playerIndex, movieIndex, $event)">
                <i class="icon icon-check"></i>
              </button>
              <div class="bonus">🎉</div><!-- adding the same element as in view to avoid elements shifting when editing -->
            </div>
          </td>
        </tr>
        <tr>
          <td>Total Score</td>
          <td></td>
          <td v-for="(player, playerIndex) in game.players" :key="playerIndex">
              {{ game.calculateScore(playerIndex) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="empty" v-if="!((game.players && game.players.length) || (game.movies && game.movies.length))">
        <div class="empty-icon">
          <span class="icon emoji">😞</span>
        </div>
        <p class="empty-title h5">No Movies or Player have been added, please add some!</p>
    </div>
    <player-modal :active.sync='playerModalActive' v-on:addplayer="handleAddPlayer" v-on:close="playerModalActive = false"></player-modal>
    <movie-modal :active.sync='movieModalActive' v-on:addmovie="handleAddMovie" v-on:close="movieModalActive = false"></movie-modal>

  </div>
</template>

<style scoped>
  input:disabled {
    opacity: 1;
  }
  .score {
    width: 4em;
    float:left;
  }
  .bonus {
    visibility: hidden;
    display: inline-block;
    width: 0.8rem;
    height: 1.8rem;
    font-size: 0.8rem;
    vertical-align: middle;
    text-align: center;
    line-height: 1.8rem;
  }
  .bonus.visible {
    visibility: visible;
  }
</style>

<script>
import Vue from 'vue'
import Game from '@/classes/Game'
export default {
  name: 'game',
  beforeCreate () {
    this._game = Vue.getGame(this.$route.params.id) || Vue.setGame(this.$route.params.id, {})
    Object.setPrototypeOf(this._game, Game.prototype)
  },
  methods: {
    handleAddPlayer: function (data) {
      this._game.addPlayer(data.name)
      this.update()
    },
    handleAddMovie: function (data) {
      this._game.addMovie(data.name, data.score)
      this.update()
    },
    update: function () {
      Vue.setGame(this.$route.params.id, this.game)
      this.editTracker = this.getEditTracker()
    },
    isEdit: function (playerIndex, movieIndex) {
      return this.editTracker[this.getEditName(playerIndex, movieIndex)]
    },
    getEditName: function (playerIndex, movieIndex) {
      return playerIndex + '_' + movieIndex
    },
    editScore: function (playerIndex, movieIndex) {
      var name = this.getEditName(playerIndex, movieIndex)
      this.editTracker[name] = true
    },
    saveScore: function (playerIndex, movieIndex, $event) {
      var name = this.getEditName(playerIndex, movieIndex)
      this.editTracker[name] = false
      var target = $event.target.tagName === 'button' ? $event.target : $event.target.parentElement
      var newScore = target.parentElement.querySelector('input').value

      this.game.players[playerIndex].guesses[movieIndex] = newScore
      this.update()
    },
    getEditTracker () {
      var g = this._game
      g.players = g.players || []
      return g.players.reduce((acc, player, playerIndex) => {
        g.movies.forEach((movie, movieIndex) => {
          acc[playerIndex + '_' + movieIndex] = false
        })
        return acc
      }, {})
    },
    gotBonusScore (playerIndex, movieIndex) {
      var playerGuess = this.game.players ? this.game.players[playerIndex].guesses[movieIndex] : null
      var movieScore = this.game.movies[movieIndex].score
      return playerGuess === movieScore
    }
  },
  data () {
    return {
      game: this._game,
      editTracker: this.getEditTracker(),
      playerModalActive: false,
      movieModalActive: false
    }
  }
}
</script>
