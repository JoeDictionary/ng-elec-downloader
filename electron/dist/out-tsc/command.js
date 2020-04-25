"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec = require('child_process').exec;
function testLog() {
    console.log("Test-Log from command.ts!");
}
exports.testLog = testLog;
function download(args) {
    var command = 'test -f';
    args.forEach(function (element) {
        command += ' ' + element;
    });
    exec(command, function (error, stdout, stderr) {
        if (error) {
            console.log("error: " + error.message);
            return;
        }
        if (stderr) {
            console.log("stderr: " + stderr);
            return;
        }
        console.log("stdout: " + stdout);
    });
}
//# sourceMappingURL=command.js.map