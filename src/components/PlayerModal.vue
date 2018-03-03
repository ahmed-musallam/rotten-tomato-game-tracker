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
          <form v-on:submit.prevent="addPlayer">
              <div class="form-group">
              <label class="form-label" for="player-name">Player Name</label>
              <input class="form-input" type="text" id="player-name" placeholder="Player Name" v-model="playerName">
              </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
          <button class="btn btn-primary" @click="addPlayer">Submit</button>
          <a class="btn btn-link" aria-label="Close" @click="close">Close</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'player-modal',
  props: {active: Boolean},
  data () {
    return {
      playerName: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
      this.playerName = ''
    },
    addPlayer () {
      this.$emit('addplayer', {name: this.playerName})
      this.close()
    }
  }
}
</script>
