// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
console.log("process.platform: " + process.platform)
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 1200, height: 900 })

    // and load the index.html of the app.
    let appName
    for (var param of process.argv) {
        if (param !== undefined) {
            if (param.indexOf("--app=") != -1) {
                appName = param.replace("--app=", "");
            }
        }
    }

    console.log("renderer appName: " + appName)
    if (appName === undefined) {
        console.error('lack argument(--app):');
        console.error("process.argv[" + process.argv.length + "]: " + process.argv)
        process.exit(1);
    } else if (appName === "renderer-hello-world") {
        mainWindow.loadFile('src/renderer-hello-world/index.html')
    } else if (appName === "renderer-jenkins") {
        mainWindow.loadFile('src/renderer-jenkins/index.html')
    } else if (appName === "renderer-split-view") {
        mainWindow.loadFile('src/renderer-split-view/index.html')
    } else {
        console.error('This app is not supporetd!!!');
        process.exit(1);
    }

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    mainWindow.on('resize', function () {
        const message = `Size: ${mainWindow.getSize()} Position: ${mainWindow.getPosition()}`
        console.log(message)
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    } else {
        const options = {
            type: 'info',
            title: 'アプリを終了しますか？',
            message: "アプリを完全に終了しますか？",
            buttons: ['Yes', 'No']
        }
        dialog.showMessageBox(options, (index) => {
            console.log("options[index:" + index + "]:" + options.buttons[index])
            if (index === 0) {
                app.quit()
            }
        })
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.