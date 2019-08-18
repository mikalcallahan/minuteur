#!/usr/bin/env node

// imports
const readline = require('readline-sync') // for cli i/o
const fs = require('fs') // for file system i/o
const notifier = require('node-notifier')

// global variables
//const path = './config' // temp path
const path = process.env['HOME'] + '/.config/minutuer' // set config & log path
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

// notifier.on('click', function(notifierObject, options, event) {})

// notifier.on('timeout', function(notifierObject, options) {})

checkDir() // check if directory exists, if not create it

async function checkDir() {
  await fs.mkdir(path, { recursive: true }, err => {
    // promise to make directory
    if (err) {
      console.log(err.message)
    } else {
      //printToTerminal('directory created')
    }
  })
  //printToTerminal('directory created')
}

// commence app
var mode = readline.question('Que veuillez-vous faire?\n') // get mode type
printToTerminal('\n')
switch (mode) {
  case 'log': // if log, insert
    insertLog()
    break
  case 'timer': // if timer, timer
    beginTimer()
    break
  case 'chronometre':
    chronometre()
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
  printToTerminal('\n')
  log.project = readline.question('Quel projet est-ce que?\n')
  printToTerminal('\n')
  log.desc = readline.question('Inscrire une description\n')
  printToTerminal('\n')
  log.start = readline.question('À quel heure as tu commencé?\n')
  printToTerminal('\n')
  log.stop = readline.question('À quel heure est tu fini.e?\n')
  printToTerminal('\n')
  log.time = (Math.round(log.stop - log.start) * 100) / 100
  logs.push(log)
  await updateLog()
}

function printToTerminal(message: string) {
  console.log(message)
}

async function updateLog() {
  await fs.appendFile(path + '/log.json', JSON.stringify(log, null, 2), err => {
    // promise to append log file
    if (!err) {
      // if no error
    }
  })
  // printToTerminal('appended file')
}

/*
 *  Commences timer
 *  @function timer
 */
async function beginTimer() {
  generateLog()
  const timerTime = readline.question('Combien de temps? (en minutes)\n')
  log.start = getCurrentTime()
  setTimeout(printNotification, +timerTime * 60000)
  log.stop = getCurrentTime()
  log.time = +timerTime
  logs.push(log)
  await updateLog()
}

function generateLog() {
  log.area = readline.question('Quel genre est-ce que?\n')
  printToTerminal('\n')
  log.project = readline.question('Quel projet est-ce que?\n')
  printToTerminal('\n')
  log.desc = readline.question('Inscrire une description\n')
  printToTerminal('\n')
}

function getCurrentTime() {
  return new Date().getTime()
}

function printNotification() {
  try {
    notifier.notify({
      title: 'Attention! Attention!',
      message: 'Votre minuteur a fini!',
      wait: true,
    })
  } catch (err) {
    printToTerminal(err)
  }
  printToTerminal('timer done!!')
}

function chronometre() {
  let startTime = new Date()
  readline.question('Entre  r e t u r n  quand tu veux finir\n\n')
  const endTime = new Date()
  const timerDifference = Math.abs(+endTime - +startTime) / 1000
  const timerDifferenceAsString = timerDifference.toString() + ' seconds'
  printToTerminal(timerDifferenceAsString)
}
