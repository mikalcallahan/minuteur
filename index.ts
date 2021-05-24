#!/usr/bin/env node

// imports
// import * as readline from 'readline-sync'
import * as fs from 'fs'
import * as notifier from 'node-notifier'
import * as dateFns from 'date-fns'
import * as readline from 'readline'
// const readline = require('readline')
import { toDate } from 'date-fns'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
function printToTerminal(message: any) {
  console.log(message)
}

/*
 *  Commences timer
 *  @function timer
 */
beginTimer()
async function beginTimer() {
  rl.question('Combien des temps est le minutuer (en minutes)?\n', (answer: string) => {
    // @TODO: create interface to store information and save in json or something

    printToTerminal(`Commencé à ${dateFns.format(getCurrentTime(), 'H\'h\'m' )}`)
    setTimeout(printNotification, +answer * 60000)
    rl.close()
  })
}

function getCurrentTime() {
  return new Date().getTime()
}

function printNotification() {
  notifier.notify({
    title: 'Attention! Attention!',
    message: 'Votre minuteur a fini!',
    closeLabel: 'Close',
    sound: 'Bass',
    timeout: 30,
  },
  (err, response, metadata) => {
    err ? console.log('error', err) : console.log(response)
  })
}

