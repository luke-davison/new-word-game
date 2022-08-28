
import * as readline from 'readline'

import { getDailyGame } from './games/getDailyGame'
import { getBestWords } from './utils/getBestWords'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const checkGame = () => {
  const args = process.argv.slice(2)
  if (args[0]) {
    const game = getDailyGame(args[0])
    if (game) {
      console.log("Finding best words for game", args[0])
      getBestWords(game, Number(args[1]) || 99)
    } else {
      console.log("Game not found")
    }
    rl.close()
  } else {
    rl.question('Enter the date to check ', (dateString: string) => {
      const game = getDailyGame(dateString)
      if (game) {
        rl.question('Enter the minimum points to print ', (pointsString) => {
          getBestWords(game, Number(pointsString) || 99)
          askAgain()
        })
      } else {
        console.log("Game not found")
        askAgain()
      }
    }) 
  }
}

const askAgain = () => {
  rl.question('Do you want to check another? ', (reply) => {
    if (reply.toLowerCase() === "y" || reply.toLocaleLowerCase() === 'yes') {
      checkGame()
    } else {
      rl.close()
    }
  })
}

checkGame()