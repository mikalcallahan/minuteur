#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// imports
var readline = require('readline-sync'); // for cli i/o
var fs = require('fs'); // for file system i/o
var notifier = require('node-notifier');
// global variables
var path = './config'; // temp path
//const path=process.env['HOME']+'/.config/minutuer'  // set config & log path
var logs = [];
var log = {
    // define skeleton of log object
    area: '',
    project: '',
    desc: '',
    start: 0,
    stop: 0,
    time: 0
};
notifier.on('click', function (notifierObject, options, event) { });
notifier.on('timeout', function (notifierObject, options) { });
checkDir(); // check if directory exists, if not create it
// commence app
var mode = readline.question('Que veuillez-vous faire?\n'); // get mode type
switch (mode) {
    case 'log': // if log, insert
        insertLog();
        break;
    case 'timer': // if timer, timer
        beginTimer();
        break;
    default:
        // default displays help
        //help()
        printToTerminal('latta');
        break;
}
/*
 *  Insert a new timestamp in log
 *  @async
 *  @function insert
 */
function insertLog() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log.area = readline.question('Quel genre est-ce que?\n');
                    log.project = readline.question('Quel projet est-ce que?\n');
                    log.desc = readline.question('Inscrire une description\n');
                    log.start = readline.question('À quel heure as tu commencé?\n');
                    log.stop = readline.question('À quel heure est tu fini.e?\n');
                    log.time = (Math.round(log.stop - log.start) * 100) / 100;
                    logs.push(log);
                    return [4 /*yield*/, updateLog()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/*
 *  Commences timer
 *  @function timer
 */
function beginTimer() {
    return __awaiter(this, void 0, void 0, function () {
        var timerTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timerTime = readline.question('Combien de temps?\n');
                    (log.area = 'Timer'),
                        (log.project = 'unknown'),
                        (log.desc = 'unknown'),
                        (log.start = new Date().getTime()),
                        (log.stop = log.start + +timerTime),
                        (log.time = (Math.round(log.stop - log.start) * 100) / 100);
                    setTimeout(printNotification, timerTime * 60000);
                    logs.push(log);
                    return [4 /*yield*/, updateLog()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function printNotification() {
    printToTerminal('timer done!!');
    notifier.notify({
        title: 'Attention! Attention!',
        message: 'Ce minuteur a fini!',
        wait: true
    });
}
function printToTerminal(message) {
    console.log(message);
}
/*
 *  Check to see if directory exists,
 *  if it does not, creates it
 *  @async
 *  @function checkDir
 */
function checkDir() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.mkdir(path, { recursive: true }, function (err) {
                        // promise to make directory
                        if (err) {
                            console.log(err.message);
                        } // if error
                        else {
                            printToTerminal('directory created');
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/*
 *  Updates (appends)the current log
 *  with data insert
 *  @async
 *
 */
function updateLog() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.appendFile(path + '/log.json', JSON.stringify(log, null, 2), function (err) {
                        // promise to append log file
                        if (!err) {
                            // if no error
                            console.log(log);
                            console.log('appended file');
                            return;
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
