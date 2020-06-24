#!/usr/bin/env node

// imports
import * as readline from 'readline-sync'
import * as fs from 'fs'
import * as notifier from 'node-notifier'
import * as dateFns from 'date-fns'
import { toDate } from 'date-fns'

// global variables
//const path = './config' // temp path
const path = process.env['HOME'] + '/.config/minutuer' // set config & log path
var logs = []
var log: Log = {
  // define skeleton of log object
  area: '',
  project: '',
  desc: '',
  start: '',
  stop: '',
  time: 0,
  timestamp: 0
}

interface Log {
  area: string,
  project: string,
  desc: string,
  start: string,
  stop: string,
  time: number,
  timestamp: number
}

// notifier.on('click', function(notifierObject, options, event) {})

// notifier.on('timeout', function(notifierObject, options) {})

checkDir() // check if directory exists, if not create it

async function checkDir() {
  fs.mkdir(path, { recursive: true }, err => {
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
var mode = readline.question('Qu\'est-ce que vous voulez faire?\n') // get mode type
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

function printToTerminal(message: any) {
  console.log(message)
}

async function updateLog() {
  log.timestamp = getCurrentTime()
  const oldLogs: Log[] = JSON.parse(fs.readFileSync(path + '/log.json', 'utf8'))// , (err, data) => {
  const newLogs = {...oldLogs, length: log}
  fs.writeFile(path + '/log.json', JSON.stringify(newLogs, null, 2), { flag: 'w+' }, err => {
    // promise to append log file
    if (!err) {
      // if no error
    }
  })
}

/*
 *  Commences timer
 *  @function timer
 */
async function beginTimer() {
  generateLog(false)
  const timerTime = readline.question('Combien de temps? (en minutes)\n')
  log.start = getCurrentTime().toString()

  printToTerminal(`Commencé à ${dateFns.format(getCurrentTime(), 'H\'h\'m' )}`)
  
  setTimeout(printNotification, +timerTime * 60000)
  log.stop = getCurrentTime().toString()
  log.time = +timerTime
  logs.push(log)
  await updateLog()
}

function generateLog(long: boolean) : void {
  log.area = readline.question('Qu\'est-ce que le genre?\n')
  printToTerminal('\n')
  log.project = readline.question('Qu\'est-ce le projet?\n')
  printToTerminal('\n')
  log.desc = readline.question('Inscrire une description\n')
  printToTerminal('\n')
  if(long) {
  log.start = readline.question('À quel heure est-ce que vous avez commencer?\n')
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
