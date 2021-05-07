const {app, BrowserWindow, nativeTheme} = require('electron')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup'))
    app.quit()

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        darkTheme: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    nativeTheme.themeSource = "dark"
}

app
    .on('ready', createWindow)
    .on('window-all-closed', () => app.quit())
