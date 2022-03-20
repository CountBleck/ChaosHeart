import {app, BrowserWindow, nativeTheme, session} from "electron"

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup'))
    app.quit()

const start = () => {
    // Set CSP, at least for webpack-dev-server
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                "Content-Security-Policy": ["default-src * 'unsafe-eval' 'unsafe-inline'", "connect-src *"]
            }
        })
    })

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        darkTheme: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    nativeTheme.themeSource = "dark"
}

app
    .on('ready', start)
    .on('window-all-closed', () => app.quit())