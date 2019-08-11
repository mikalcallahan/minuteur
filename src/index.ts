#!/usr/bin/env node

// imports
const readline = require('readline-sync') // for cli i/o
const fs = require('fs') // for file system i/o
const notifier = require('node-notifier')

import MainMenu from './src/main-menu/main-menu'
// global variables

const path = './config' // temp path
//const path=process.env['HOME']+'/.config/minutuer'  // set config & log path

notifier.on('click', function(notifierObject, options, event) {})

notifier.on('timeout', function(notifierObject, options) {})

checkDir() // check if directory exists, if not create it

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
MainMenu
// commence app

/*
 *  Insert a new timestamp in log
 *  @async
 *  @function insert
 */

/*
 *  Commences timer
 *  @function timer
 */

function printNotification() {
  notifier.notify({
    title: 'Attention! Attention!',
    message: 'Ce minuteur a fini!',
    wait: true,
  })
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
    }
  })
}

function checkLog() {
  updateLog()
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
    }
  })
}
