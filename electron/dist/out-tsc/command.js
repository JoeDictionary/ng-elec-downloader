"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
function download(args) {
    console.log("command.ts: Downloads Starting!");
    var command = 'electron\\test.exe';
    args.forEach(function (element) {
        command += ' ' + element;
    });
    console.log("command.ts: ", command);
    child_process_1.exec(command, function (error, stdout, stderr) {
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
exports.download = download;
//# sourceMappingURL=command.js.map