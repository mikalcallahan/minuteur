const readline = require('readline-sync') // for cli i/o
const fs = require('fs') // for file system i/o

import Insert from '../insert/insert'
import Timer from '../timer/timer'

export default () => {
  const mode = readline.question("Qu'est-ce que vous voulez faire?\n") // get mode type
  switch (mode) {
    case 'insert': // if log, insert
      Insert
      // insertLog()
      break
    case 'timer': // if timer, timer
      Timer
      // beginTimer()
      break
    case 'create':
      // checkLog()
      break
    default:
      // default displays help
      //help()
      console.log('lataa')
      break
  }
}
