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
  log.area = readline.question('Quel genre est-ce que?\n')
  log.project = readline.question('Quel projet est-ce que?\n')
  log.desc = readline.question('Inscrire une description\n')
  log.start = readline.question('À quel heure as tu commencé?\n')
  log.stop = readline.question('À quel heure est tu fini.e?\n')
  logs.push(log)
  // await updateLog()
}
