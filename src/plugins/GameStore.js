export default {
  install: function (Vue, options) {
    var PREFIX = 'game_'
    Vue.GameStore = {}

    Vue.getGame = (id) => {
      var tempJsonStr = localStorage.getItem(PREFIX + id) || '{}'
      return JSON.parse(tempJsonStr)
    }

    Vue.setGame = (id, obj) => {
      var tempObj = obj || {}
      localStorage.setItem(PREFIX + id, JSON.stringify(tempObj))
      return Vue.getGame(id)
    }

    Vue.removeGame = (id) => {
      localStorage.removeItem(PREFIX + id)
    }

    Vue.getGames = () => {
      return Object.keys(localStorage)
        .filter(name => name.startsWith(PREFIX))
        .map(name => Vue.getGame(name.replace(PREFIX, '')))
    }

    Vue.getGameIds = () => Object.keys(localStorage).filter(key => key.startsWith(PREFIX)).map(key => key.replace(PREFIX, ''))
  }
}
