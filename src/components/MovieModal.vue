<template>
  <div class="modal modal-sm" :class="{active: active}" id="example-modal-2">
    <a class="modal-overlay" aria-label="Close" @click="close"></a>
    <div class="modal-container" role="document">
      <div class="modal-header">
        <a  class="btn btn-clear float-right" aria-label="Close" @click="close"></a>
        <div class="modal-title h5">Modal title</div>
      </div>
      <div class="modal-body">
        <div class="content">
          <form>
              <div class="form-group" :class="{'has-error': movieName === ''}">
                <label class="form-label" for="movie-name">Movie Name</label>
                <input class="form-input" type="text" id="movie-name" @keyup.13="addMovie"
                  ref="movieNameEl" placeholder="Movie Name" v-model="movieName">
                <p class="form-input-hint" v-if="movieName === ''">Name cannot be empty</p>
              </div>
              <div class="form-group" :class="{'has-error': movieScore === '' || movieScore === '0' || this.movieScore === 0}">
                <label class="form-label" for="movie-score">Movie Score</label>
                <input class="form-input" type="number" min="0" max="100" pattern="[0-9]*" inputmode="numeric"
                  id="movie-score" @keyup.13="addMovie" placeholder="Movie Score" v-model="movieScore"/>
                <p v-if="!movieScore || parseInt(movieScore) > 100"
                   class="form-input-hint">Enter a score larger than 0</p>
              </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
          <button class="btn btn-primary" @click="addMovie">Submit</button>
          <a class="btn btn-link" aria-label="Close" @click="close">Close</a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'movie-modal',
  props: {active: Boolean},
  watch: {
    active (val) {
      if (val) {
        Vue.nextTick(() => this.$refs.movieNameEl.focus())
      }
    }
  },
  data () {
    return {
      movieName: '',
      movieScore: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
      this.movieName = ''
      this.movieScore = ''
    },
    addMovie () {
      if (!this.movieName || !this.movieScore || parseInt(this.movieScore) > 100) return
      this.$emit('addmovie', {name: this.movieName, score: this.movieScore})
      this.close()
    }
  }
}
</script>
