#!/usr/bin/env node

// imports
import * as readline from 'readline-sync'
import * as fs from 'fs'
import * as notifier from 'node-notifier'


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
  generateLog(true)
  updateLog()
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
  generateLog(false)
  const timerTime = readline.question('Combien de temps? (en minutes)\n')
  log.start = getCurrentTime()
  setTimeout(printNotification, +timerTime * 60000)
  log.stop = getCurrentTime()
  log.time = +timerTime
  logs.push(log)
  await updateLog()
}

function generateLog(long: boolean) : void {
  log.area = readline.question('Lequel est-ce que le genre?\n')
  printToTerminal('\n')
  log.project = readline.question('Lequel est-ce le projet?\n')
  printToTerminal('\n')
  log.desc = readline.question('Inscrire une description\n')
  printToTerminal('\n')
  if(long) {
  log.start = readline.question('À quel heure est-ce que vous avez commener?\n')
  printToTerminal('\n')
  log.stop = readline.question('À quel heure est-ce que vous avez fini?\n')
  }
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
