const { app, BrowserWindow } = require("electron");
const createMenu = require("./helpers/createMenu");

let mainWindow;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });
    createMenu(mainWindow)
    mainWindow.loadFile("index.html");
}


app.whenReady().then(() => {
    createWindow();
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
    app.on("active", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})