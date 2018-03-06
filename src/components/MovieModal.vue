<template>
  <div class="modal modal-sm" :class="{active: active}" id="example-modal-2">
    <a class="modal-overlay" aria-label="Close" @click="close"></a>
    <div class="modal-container" role="document">
      <div class="modal-header">
        <a  class="btn btn-clear float-right" aria-label="Close"></a>
        <div class="modal-title h5">Modal title</div>
      </div>
      <div class="modal-body">
        <div class="content">
          <form v-on:submit.prevent="addMovie">
              <div class="form-group">
                <label class="form-label" for="movie-name">Movie Name</label>
                <input class="form-input" type="text" id="movie-name" placeholder="Movie Name" v-model="movieName">
              </div>
              <div class="form-group">
                <label class="form-label" for="movie-score">Movie Score</label>
                <input class="form-input" type="number" min="0" max="100" pattern="[0-9]*" inputmode="numeric" id="movie-score" placeholder="Movie Score" v-model="movieScore">
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
export default {
  name: 'movie-modal',
  props: {active: Boolean},
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
      this.$emit('addmovie', {name: this.movieName, score: this.movieScore})
      this.close()
    }
  }
}
</script>
