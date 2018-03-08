<template>
  <div class="container">
    <div>
      <div v-if="editNameActive" class="game-name-edit">
        <button class="btn btn-md btn-link tooltip" data-tooltip="Save" @click="saveName($event)">
          <i class="icon icon-check"></i>
        </button>
        <input class="form-input" v-model="game.name" type="text"/>
      </div>
      <div v-if="!editNameActive" class="game-name-view">
        <button class="btn btn-md btn-link tooltip" v-if="!editNameActive" data-tooltip="Edit" @click="editName($event)">
          <i class="icon icon-edit"></i>
        </button>
        <h2 class="text-ellipsis">{{game.name}}</h2>
      </div>
    </div>
    <button class="btn btn-primary tooltip" data-tooltip="ctrl+p" @click="playerModalActive = true">Add Player</button>
    <button class="btn btn-primary tooltip"  data-tooltip="ctrl+m" @click="movieModalActive = true">Add Movie</button>
    <table class="table table-striped table-hover" v-if="(game.players && game.players.length) || (game.movies && game.movies.length)">
      <thead>
        <tr>
        <th>Movie Name</th>
        <th>Movie's Score</th>
        <th v-for="(player, playerIndex) in game.players" :key="playerIndex">
          <button class="btn btn-sm btn-link tooltip" data-tooltip="Delete" @click="deletePlayer(playerIndex)">
              <i class="icon icon-delete"></i>
          </button>
          <span class="vertical-middle">{{player.name}}</span>
        </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie, movieIndex) in game.movies" :key="movieIndex">
          <td>
            <button class="btn btn-sm btn-link tooltip" data-tooltip="Delete" @click="deleteMovie(movieIndex)">
              <i class="icon icon-delete"></i>
            </button>
            <span class="vertical-middle">{{movie.name}}</span>
          </td>
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
              <input class="form-input score" type="number" min='0' max='100' pattern="[0-9]*" inputmode="numeric" :value="player.guesses[movieIndex]"/>
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
              {{ game.calculateScore(playerIndex) }} <span class="tooltip" v-if="isWinning(playerIndex)" data-tooltip="Winner winner chicken dinner!">🏆</span>
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
  .vertical-middle {
    vertical-align: middle;
  }
  .game-name-view {
    height: 3rem;
    float: left;
    clear: both;
    display: block;
    width: 100%;
  }
  .game-name-view h2 {
    float: left;
    margin-left: 0.5rem;
    margin-bottom: 0;
    width: 77vw;
    height: 2rem;
  }
  .game-name-view button {
    float: left;
    clear: right;
  }
  .game-name-edit {
    height: 3rem;
  }
  .game-name-edit input {
    width: 77vw;
    float: left;
  }
  .game-name-edit button {
    float: left;
    clear: right;
  }
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
    this._game.name = this._game.name ? this._game.name : 'Game ' + this.$route.params.id
    Vue.setGame(this.$route.params.id, this._game)
  },
  mounted () {
    this.$root.$on('ctrl+80', event => { // ctrl+p shortcut
      this.playerModalActive = true
      this.movieModalActive = false
    })
    this.$root.$on('ctrl+77', event => { // ctrl+m shortcut
      this.playerModalActive = false
      this.movieModalActive = true
    })
  },
  methods: {
    saveName: function ($event) {
      this.editNameActive = false
      var target = $event.target.tagName === 'button' ? $event.target : $event.target.parentElement
      var newName = target.parentElement.querySelector('input').value
      this.game.name = newName
      this.update()
    },
    editName: function ($e) {
      this.editNameActive = true
    },
    handleAddPlayer: function (data) {
      this._game.addPlayer(data.name)
      this.update()
    },
    handleAddMovie: function (data) {
      this._game.addMovie(data.name, data.score)
      this.update()
    },
    deleteMovie: function (index) {
      this._game.deleteMovie(index)
      this.update()
    },
    deletePlayer: function (index) {
      this._game.deletePlayer(index)
      this.update()
    },
    update: function () {
      Vue.setGame(this.$route.params.id, this.game) // neccessary for Vue change detection
      this.editTracker = this.getEditTracker() // update edit references
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
      newScore = newScore || 0
      this.game.players[playerIndex].guesses[movieIndex] = newScore
      this.update()
    },
    isWinning (playerIndex) {
      if (!this.game.players) return false
      var shouldCalculate = this.game.players.map(p => {
        return p.guesses.reduce((acc, guess) => acc || guess !== 0, false)
      }).reduce((acc, guess) => acc && guess, true)
      if (!shouldCalculate) return false
      var scores = this.game.players.map((p, i) => this.game.calculateScore(i))
      var min = Math.min(...scores)
      return min === scores[playerIndex]
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
      movieModalActive: false,
      editNameActive: false
    }
  }
}
</script>
