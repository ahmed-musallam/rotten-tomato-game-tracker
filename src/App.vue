<template>
  <div id="app">
    <div class="main container m-2">
        <nav class="navbar p-2">
          <section class="navbar-section">
            <router-link class="btn btn-link" to="/">Home</router-link>
            <router-link class="btn btn-link" to="/motivation">Motivation</router-link>
            <a class="btn btn-link" href="https://github.com/ahmed-musallam/rotten-tomato-game-tracker">source code</a>
          </section>
        </nav>
        <transition name="fade">
          <router-view/>
        </transition>
    </div>
    <div class="footer"> Made with <a href="https://vuejs.org/">Vue</a>+<a href="https://picturepan2.github.io/spectre/">Spectre.css</a> by Ahmed Musallam </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import '../node_modules/spectre.css/dist/spectre.min.css';
@import '../node_modules/spectre.css/dist/spectre-icons.min.css';

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  height: 0px;
  width:0px;
  overflow: hidden;
}

.main {
    min-height: calc(100vh - 80px);
}
.footer {
  margin: 2.5em 0.5em 3em 0.5em;
  text-align: center;
  width: 100%;
}
</style>
