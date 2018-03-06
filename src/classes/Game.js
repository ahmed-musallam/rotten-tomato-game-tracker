export default class {
  calculateScore (playerIndex) {
    var playerGuesses = this.players[playerIndex].guesses
    var movieScores = this.movies.map(movie => parseInt(movie.score))
    return playerGuesses.reduce(function (acc, guess, index) {
      var curentAbs = Math.abs(parseInt(movieScores[index]) - parseInt(guess))
      curentAbs = curentAbs === 0 ? -5 : curentAbs // add a 5 point bonus when player guesses the score exactly
      return acc + curentAbs
    }, 0)
  }
  addMovie (name, score) {
    this.movies = this.movies || []
    this.movies.push({
      name: name,
      score: score
    })
    if (this.players) {
      this.players.map(player => {
        if (player.guesses) player.guesses.push(0)
        return player
      })
    }
  }
  addPlayer (name) {
    if (!name) return
    name = name[0].toUpperCase() + name.substring(1, name.length)
    this.players = this.players || []
    this.movies = this.movies || []
    this.players.push({
      name: name,
      guesses: new Array(this.movies.length).fill(0)
    })
  }
}
