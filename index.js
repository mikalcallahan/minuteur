#!/usr/bin/env node

// imports
const readline=require('readline-sync') // for cli i/o
const fs=require('fs')  // for file system i/o

// global variables
const path='./config' // temp path
//const path=process.env['HOME']+'/.config/minutuer'  // set config & log path
var logs = []
var log = { // define skeleton of log object
  area: '',
  project: '',
  desc: '',
  start: '',
  stop: ''
}

checkDir()  // check if directory exists, if not create it

// commence app
var mode = readline.question('What would you like to do?\n')  // get mode type
switch(mode) {
  case 'log': // if log, insert
    insert()
    break
  case 'timer': // if timer, timer
    timer()
    break
  default:  // default displays help
    //help()
    console.log('lataa')
    break
}

/*
 *  Insert a new timestamp in log
 *  @async
 *  @function insert
 */
async function insert() {
  log.area = readline.question('Quel genre est-ce que?\n')
  log.project = readline.question('Quel projet est-ce que?\n')
  log.desc = readline.question('Inscrire une description\n')
  log.start = readline.question('À quel heure as tu commencé?\n')
  log.stop = readline.question('À quel heure est tu fini.e?\n')
  logs.push(log)
  await updateLog()
}

/*
 *  Commences timer
 *  @function timer
 */
function timer() {
  console.log('insert')
}

/*
 *  Check to see if directory exists,
 *  if it does not, creates it
 *  @async
 *  @function checkDir
 */
async function checkDir() {
  await fs.mkdir(path, { recursive: true }, (err) => {  // promise to make directory
    if(err) { console.log(err.message) }  // if error
    else { console.log('dir created') }
  })
}

/*
 *  Updates (appends)the current log
 *  with data insert
 *  @async
 *
 */
async function updateLog() {
  await fs.appendFile(path+'/log.json', space+JSON.stringify(log, null, 2), (err) => {  // promise to append log file
    if(!err) {  // if no error
      console.log(log)
      console.log('appended file')
    }
  })
}
