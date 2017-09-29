import { dialog, ipcMain } from 'electron';

export const bindIpcMain = function (mainWindow) {
  ipcMain.on('win-close', function () {
    mainWindow.close();
  })

  ipcMain.on('win-full', function () {
    mainWindow.setFullScreen(true)
  })

  ipcMain.on('open-file-dialog', function (event) {
    dialog.showOpenDialog({
      filters: [
        { name: 'PSD', extensions: ['psd'] }
      ],
      properties: ['openFile', 'openFile']
    }, function (file) {
      if (file) event.sender.send('selected-file', file)
    })
  })

  ipcMain.on('open-directory-dialog', function (event) {
    dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory']
    }, function (files) {
      if (files) event.sender.send('selected-directory', files)
    })
  })
}