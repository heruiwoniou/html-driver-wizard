import * as electron from 'electron'
import { BrowserWindow, app } from 'electron'
import { bindIpcMain } from './ipc';
import * as conf from '../conf'

const path = require('path')
const url = require('url')
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: conf.view.mainWidth,
    height: conf.view.mainHeight,
    frame: false
  })
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

  bindIpcMain(mainWindow)
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