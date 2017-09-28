"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var conf = require("../conf/index");
var ipc = electron_1.ipcMain;
var path = require('path');
var url = require('url');
var mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: conf.view.mainWidth,
        height: conf.view.mainHeight,
        frame: false
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(conf.root, 'index.html'),
        protocol: 'file:',
        slashes: true,
        movable: true
    }));
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    ipc.on('win-close', function () {
        mainWindow.close();
    });
    ipc.on('win-full', function () {
        mainWindow.setFullScreen(true);
    });
    ipc.on('open-file-dialog', function (event) {
        electron_1.dialog.showOpenDialog({
            filters: [
                { name: 'PSD', extensions: ['psd'] }
            ],
            properties: ['openFile', 'openFile']
        }, function (file) {
            if (file)
                event.sender.send('selected-file', file);
        });
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=index.js.map