/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle(src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

 const app = Vue.createApp ( {
  data: function () {
    return {
      maxGuesses: 3, 
      alert:'',
      game: { 
        active: true,
        words: ["table", "yellow", "thanks", "school", "assignment", "pink", "fish", "build", "clash", "design"],
        passes: 3,
        points: 0,
        strikes: 0,
        guesses: 0, //number of guesses
        guess: '', //current guess
        message: ''
      }
    }
  },
  created: function () {
      const game = localStorage.getItem('game')
  
      if (game) {
        this.game = JSON.parse(game)
      }
  },

  computed: {
    word: function () {
      return this.game.words[0] 
    },
    scrambled: function () {
      return shuffle(this.word)
    }
  },

  methods: {
    verifyGuess: function () {
      if (this.word === this.game.guess.toLowerCase()) {
        this.game.points++
        this.game.words.shift()
        this.game.guess = ''
        this.game.message = `Correct. Next word!`
        this.alert = 'success'
      } else {        
        this.game.guesses++
        this.game.strikes++
        this.game.guess = ''
        this.alert = 'danger'
        if (this.game.guesses === this.maxGuesses) {
          this.game.active = false
          this.game.message = `You lost!`
        } else {
          this.game.message = `Wrong. Try again!`
        }
      }
    },
    
    pass: function () {
      if (this.game.passes) {
        this.game.passes--
        this.game.words.shift()
        this.game.message = `You passed. New word!`
        this.alert = 'warning'
      }
    },
    
    playGame: function () {
      this.game.words.shift()
      this.resetGame()
      this.game.active = true
    },

    resetGame: function () {
      const that = this
      setTimeout (function () {
        that.game.message = ''
        that.game.guess = ''
        that.game.passes = 3
        that.game.guesses = 0
        that.game.points = 0
        that.game.strikes = 0
      })
    }
  },

  watch: {
    game: {
      deep: true,
      handler: function (game) {
        localStorage.setItem('game', JSON.stringify(game))
      }
    }
  }
 })

 const vm = app.mount('#app')