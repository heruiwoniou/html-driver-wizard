const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = require('electron').ipcMain

const path = require('path')
const url = require('url')
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1440, height: 768, frame: false })
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
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