const readline = require('readline-sync') // for cli i/

let logs = []
let log = {
  // define skeleton of log object
  area: '',
  project: '',
  desc: '',
  start: 0,
  stop: '',
  time: '',
}
export default async () => {
  const timerTime = readline.question('Combien de temps?\n')
  log.area = 'Timer'
  log.project = 'unknown'
  log.desc = 'unknown'
  log.start = new Date().getTime()
  log.stop = log.start + timerTime
  log.time = timerTime
  logs.push(log)
  setTimeout(() => console.log('time'), timerTime * 60000)
  //await updateLog()
  //setTimeout(printNotification, timerTime * 60000)
}
