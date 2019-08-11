"use strict";
exports.__esModule = true;
var readline = require('readline-sync'); // for cli i/o
var fs = require('fs'); // for file system i/o
var insert_1 = require("../insert/insert");
var timer_1 = require("../timer/timer");
exports["default"] = (function () {
    var mode = readline.question("Qu'est-ce que vous voulez faire?\n"); // get mode type
    switch (mode) {
        case 'insert': // if log, insert
            insert_1["default"];
            // insertLog()
            break;
        case 'timer': // if timer, timer
            timer_1["default"];
            // beginTimer()
            break;
        case 'create':
            // checkLog()
            break;
        default:
            // default displays help
            //help()
            console.log('lataa');
            break;
    }
});
