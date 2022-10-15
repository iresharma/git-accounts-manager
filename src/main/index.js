import { app, BrowserWindow } from 'electron'
const { menubar } = require('menubar')
const { sshFolderContents, getConfig } = require('./fileExplorer')
const path = require('path')

const mb = menubar({
  index: 'file://' + app.getAppPath() + '/renderer/index.html',
  tooltip: 'git switch',
  browserWindow: {
    maxWidth: 300,
    maxHeight: 600,
    width: 300,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js')
    }
  }
});

mb.on('ready', () => {
  console.log('app stated');
});

mb.on('after-create-window', () => {
  mb.window.webContents.openDevTools();
})

mb.on('show', () => {

  // TODO: github stats
  sshFolderContents().then(data => mb.window.webContents.send('loaded', data))
  getConfig().then(data => mb.window.webContents.send('code', data))
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
