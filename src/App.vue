<template>
  <div id="app">
    <div class="main container">
      <header class="navbar rotten-navbar">
        <section class="navbar-section hide-sm">
          <router-link class="btn btn-link" to="/">Home</router-link>
          <router-link class="btn btn-link" to="/motivation">Motivation</router-link>
        </section>
        <section class="navbar-section show-sm">
          <a class="btn" @click="menuActive = !menuActive">
            <i class="icon icon-menu"></i>
          </a>
          <div class="off-canvas">
              <div class="off-canvas-sidebar m-2 p-2" :class="{active: menuActive}">
                <div class="container p-2">
                  <div class="columns">
                      <a class="column col-12 btn btn-link p-2" @click="menuActive = !menuActive">
                        <i class="icon icon-menu"></i>
                      </a>
                      <router-link class="column col-12 btn btn-link p-2" to="/">
                        <span @click="closeSidebar">Home</span>
                      </router-link>
                      <router-link class="column col-12 btn btn-link p-2" to="/motivation">
                        <span @click="closeSidebar">Motivation</span>
                      </router-link>
                      <a class="column col-12 btn btn-link p-2" href="https://github.com/ahmed-musallam/rotten-tomato-game-tracker">
                        <i class="icon icon-link"></i> source code
                      </a>

                  </div>
                </div>
              </div>
              <a class="off-canvas-overlay" @click="closeSidebar"></a>
          </div>
        </section>
        <section class="navbar-center">
          <img class="logo" src="static/logo.svg">
        </section>
        <section class="navbar-section hide-sm">
          <a class="btn" href="https://github.com/ahmed-musallam/rotten-tomato-game-tracker"><i class="icon icon-link"></i> source code</a>
        </section>
      </header>
      <transition name="fade">
        <router-view class="content"/>
      </transition>
    </div>
    <div class="footer"> Made with <a href="https://vuejs.org/">Vue</a>+<a href="https://picturepan2.github.io/spectre/">Spectre.css</a> by Ahmed Musallam </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    closeSidebar: function () {
      this.menuActive = false
    }
  },
  data () {
    return {
      menuActive: false
    }
  }
}
</script>

<style>
@import '../node_modules/spectre.css/dist/spectre.min.css';
@import '../node_modules/spectre.css/dist/spectre-icons.min.css';
@import '../node_modules/spectre.css/dist/spectre-exp.min.css';
.rotten-navbar {
    height: 3rem;
    z-index: 100;
    background-color: #f8f9fa;
    position: absolute;
    left: 0;
    right: 0;
    padding-left: 1rem;
    padding-right: 1rem;
    min-width: 100vw;
}
.content {
  padding-top:3.5rem;
}
@media (max-width: 960px){
  .rotten-navbar {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      height: 2.8rem;
      background: #f8f9fa;
      left: 0;
  }
  .content {
    padding-top:3.5rem;
  }
}
.btn-link.active {
  border-color: #3634d2;
}
.off-canvas-sidebar .btn-link.active {
  border-color: transparent;
  font-weight: 700;
}
.logo {
  height: 32px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  height: 0px;
  width:0px;
  padding-top: 0;
  overflow: hidden;
}
.main {
    min-height: calc(100vh - 80px);
}
.footer {
  margin: 0.5em 0em 3em 0em;
  text-align: center;
  width: auto;
}
</style>
