"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var command_1 = require("./command");
var ytdl_core_1 = require("ytdl-core");
console.log("__dirname: ", __dirname);
function createWindow() {
    win = new electron_1.BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
        width: 1200,
        height: 1200,
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../../../dist/ng-elec-downloader/index.html'),
        // pathname: "C:/Users/filip/Desktop/PROGRAMMING/ng-elec-downloader/dist/ng-elec-downloader/index.html",
        protocol: 'file:',
        slashes: true,
    }));
    // win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
var win;
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
electron_1.ipcMain.on('sendLinks', function (event, arg) {
    console.log("Links arrived: " + event + ", " + arg);
    command_1.download(arg);
    // ANCHOR wait for stdout
    console.log("Downloads Done!");
});
electron_1.ipcMain.on('getVideoTitle', function (event, arg) {
    console.log('main.ts: getiVideoTitle invoked', arg);
    ytdl_core_1.getInfo(arg, function (err, info) {
        win.webContents.send('videoTitle', info.title);
        // console.log('main.ts:getInfo: ', info.title)
    });
});
//# sourceMappingURL=main.js.map