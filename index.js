#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
// imports
var readline = require("readline-sync");
var fs = require("fs");
var notifier = require("node-notifier");
// global variables
//const path = './config' // temp path
var path = process.env['HOME'] + '/.config/minutuer'; // set config & log path
var logs = [];
var log = {
    // define skeleton of log object
    area: '',
    project: '',
    desc: '',
    start: '',
    stop: '',
    time: 0
};
// notifier.on('click', function(notifierObject, options, event) {})
// notifier.on('timeout', function(notifierObject, options) {})
checkDir(); // check if directory exists, if not create it
function checkDir() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.mkdir(path, { recursive: true }, function (err) {
                        // promise to make directory
                        if (err) {
                            console.log(err.message);
                        }
                        else {
                            //printToTerminal('directory created')
                        }
                    })
                    //printToTerminal('directory created')
                ];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// commence app
var mode = readline.question('Qu\'est-ce que vous voulez faire?\n'); // get mode type
printToTerminal('\n');
switch (mode) {
    case 'log': // if log, insert
        insertLog();
        break;
    case 'timer': // if timer, timer
        beginTimer();
        break;
    case 'chronometre':
        chronometre();
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
            generateLog(true);
            updateLog();
            return [2 /*return*/];
        });
    });
}
function printToTerminal(message) {
    console.log(message);
}
function updateLog() {
    return __awaiter(this, void 0, void 0, function () {
        var oldLogs, newLogs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oldLogs = JSON.parse(fs.readFileSync(path + '/log.json', 'utf8')) // , (err, data) => {
                    ;
                    newLogs = __assign(__assign({}, oldLogs), { log: log });
                    return [4 /*yield*/, fs.writeFile(path + '/log.json', JSON.stringify(newLogs, null, 2), { flag: 'w+' }, function (err) {
                            // promise to append log file
                            if (!err) {
                                // if no error
                            }
                        })
                        // printToTerminal('appended file')
                    ];
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
                    generateLog(false);
                    timerTime = readline.question('Combien de temps? (en minutes)\n');
                    log.start = getCurrentTime().toString();
                    setTimeout(printNotification, +timerTime * 60000);
                    log.stop = getCurrentTime().toString();
                    log.time = +timerTime;
                    logs.push(log);
                    return [4 /*yield*/, updateLog()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function generateLog(long) {
    log.area = readline.question('Qu\'est-ce que le genre?\n');
    printToTerminal('\n');
    log.project = readline.question('Qu\'est-ce le projet?\n');
    printToTerminal('\n');
    log.desc = readline.question('Inscrire une description\n');
    printToTerminal('\n');
    if (long) {
        log.start = readline.question('À quel heure est-ce que vous avez commencer?\n');
        printToTerminal('\n');
        log.stop = readline.question('À quel heure est-ce que vous avez fini?\n');
    }
}
function getCurrentTime() {
    return new Date().getTime();
}
function printNotification() {
    try {
        notifier.notify({
            title: 'Attention! Attention!',
            message: 'Votre minuteur a fini!',
            wait: true
        });
    }
    catch (err) {
        printToTerminal(err);
    }
    printToTerminal('timer done!!');
}
function chronometre() {
    var startTime = new Date();
    readline.question('Entre  r e t u r n  quand tu veux finir\n\n');
    var endTime = new Date();
    var timerDifference = Math.abs(+endTime - +startTime) / 1000;
    var timerDifferenceAsString = timerDifference.toString() + ' seconds';
    printToTerminal(timerDifferenceAsString);
}
