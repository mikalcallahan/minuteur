#!/usr/bin/env node

// imports
const readline = require('readline-sync') // for cli i/o
const fs = require('fs') // for file system i/o
const notifier = require('node-notifier')

// global variables
const path = './config' // temp path
//const path=process.env['HOME']+'/.config/minutuer'  // set config & log path
var logs = []
var log = {
  // define skeleton of log object
  area: '',
  project: '',
  desc: '',
  start: 0,
  stop: 0,
  time: 0,
}

notifier.on('click', function(notifierObject, options, event) {})

notifier.on('timeout', function(notifierObject, options) {})

checkDir() // check if directory exists, if not create it

// commence app
var mode = readline.question('Que veuillez-vous faire?\n') // get mode type
switch (mode) {
  case 'log': // if log, insert
    insertLog()
    break
  case 'timer': // if timer, timer
    beginTimer()
    break
  default:
    // default displays help
    //help()
    printToTerminal('latta')
    break
}

/*
 *  Insert a new timestamp in log
 *  @async
 *  @function insert
 */
async function insertLog() {
  log.area = readline.question('Quel genre est-ce que?\n')
  log.project = readline.question('Quel projet est-ce que?\n')
  log.desc = readline.question('Inscrire une description\n')
  log.start = readline.question('À quel heure as tu commencé?\n')
  log.stop = readline.question('À quel heure est tu fini.e?\n')
  log.time = (Math.round(log.stop - log.start) * 100) / 100
  logs.push(log)
  await updateLog()
}

/*
 *  Commences timer
 *  @function timer
 */
async function beginTimer() {
  const timerTime = readline.question('Combien de temps?\n')
  ;(log.area = 'Timer'),
    (log.project = 'unknown'),
    (log.desc = 'unknown'),
    (log.start = new Date().getTime()),
    (log.stop = log.start + +timerTime),
    (log.time = (Math.round(log.stop - log.start) * 100) / 100)
  setTimeout(printNotification, timerTime * 60000)
  logs.push(log)
  await updateLog()
}

function printNotification() {
  printToTerminal('timer done!!')
  notifier.notify({
    title: 'Attention! Attention!',
    message: 'Ce minuteur a fini!',
    wait: true,
  })
}

function printToTerminal(message: string) {
  console.log(message)
}

/*
 *  Check to see if directory exists,
 *  if it does not, creates it
 *  @async
 *  @function checkDir
 */
async function checkDir() {
  await fs.mkdir(path, { recursive: true }, err => {
    // promise to make directory
    if (err) {
      console.log(err.message)
    } // if error
    else {
      printToTerminal('directory created')
    }
  })
}

/*
 *  Updates (appends)the current log
 *  with data insert
 *  @async
 *
 */
async function updateLog() {
  await fs.appendFile(path + '/log.json', JSON.stringify(log, null, 2), err => {
    // promise to append log file
    if (!err) {
      // if no error
      console.log(log)
      console.log('appended file')
      return
    }
  })
}
