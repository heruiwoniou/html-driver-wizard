import * as electron from 'electron'
import { ipcMain, dialog, BrowserWindow, app } from 'electron'
import conf from '../conf/index'

const ipc = ipcMain
const path = require('path')
const url = require('url')
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1440, height: 768, frame: false })
  mainWindow.loadURL(url.format({
    pathname: path.join(conf.root, 'index.html'),
    protocol: 'file:',
    slashes: true,
    movable: true
  }))

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })


  ipc.on('win-close', function () {
    mainWindow.close();
  })

  ipc.on('open-file-dialog', function (event) {
    dialog.showOpenDialog({
      filters: [
        { name: 'PSD', extensions: ['psd'] }
      ],
      properties: ['openFile', 'openFile']
    }, function (file) {
      if (file) event.sender.send('selected-file', file)
    })
  })
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})