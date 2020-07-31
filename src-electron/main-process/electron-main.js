import { app, BrowserWindow, nativeTheme, Menu, ipcMain } from 'electron'
import { menuTemplate } from './electron-main-menu-template'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
  if (process.env.PROD) {
    global.__statics = __dirname
  }

/*
 Variables & Constants
*/

  export let mainWindow

  const menu = Menu.buildFromTemplate(menuTemplate)

/*
 App ready
*/

  app.on('ready', () => {
    mainWindow = new BrowserWindow({
      width: 1000,
      height: 600,
      minWidth: 750,
      minHeight: 500,
      useContentSize: true,
      webPreferences: {
        nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
        nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,
      }
    })

    mainWindow.loadURL(process.env.APP_URL)

    mainWindow.on('closed', () => {
      mainWindow = null
    })

    Menu.setApplicationMenu(menu)
  })

/*
 App events
*/
  app.on('window-all-closed', () => {
      app.quit()
  })

/*
  ipc events
*/

ipcMain.on('quit-app', () => {
  app.quit()
})