const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
    fileOpened: (cb) => ipcRenderer.on("file-opened", cb)
})