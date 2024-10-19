const { app, Menu } = require("electron");

function createMenu(mainWindow) {
    const isMac = process.platform === "darwin";
    
    const menu = Menu.buildFromTemplate([
        ...(isMac
            ?   [
                    {
                        label: app.name,
                        submenu: [
                            { role: "about" },
                            { type: "separator" },
                            { role: "services" },
                            { type: "separator" },
                            { role: "ride" },
                            { role: "hideOthers" },
                            { role: "unhide" },
                            { type: "separator" },
                            { role: "quit" },
                        ],
                    },
                ] 
            : []),

        // Aba File
        {
            label: "File",
            submenu: [
                isMac ? { role: "close" } : { role: "quit" },
                {
                    label: "Open file",
                    accelerator: "CmdOrCtrl+O",
                    click: () => console.log("open file clicked"),
                },
                {
                    label: "Save file",
                    accelerator: "CmdOrCtrl+S",
                    click: () => console.log("save file clicked"),
                },
            ],
        },

        // Aba edit
        {
            label: "Edit",
            submenu: [
                { role: "undo" },
                { role: "redo" },
                { type: "separator" },
                { role: "cut" },
                { role: "copy" },
                { role: "paste" },
                ...(isMac
                    ? [
                        { role: "pasteAndMatchStyle" },
                        { role: "delete" },
                        { role: "selectAll" },
                        { type: "separator" },
                        {
                            label: "Speech",
                            submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
                        },
                    ]
                : [{ role: "delete" }, { type: "separator"}, { role: "selectAll" }])
            ],
        },

        // aba view
        {
            label: "View",
            submenu: [
                { role: "reload" },
                { role: "forceReload" },
                { type: "separator" },
                { role: "resetZoom" },
                { role: "zoomIn" },
                { role: "zoomOut" },
                { type: "separator" },
                { role: "togglefullscreen" }
            ],
        },

        // aba window
        {
            label: "Window",
            submenu: [
                { role: "minimize" },
                { role: "zoom" },
                ...(isMac
                    ? [{ type: "separator" }, { role: "front" }, { type: "separator" }, { role: "window" }]
                : [{ role: "close" }]),
            ],
        },

        // aba help
        {
            role: "help",
            submenu: [ 
                {
                    label: "About",
                    click: () => console.log("About clicked"),
                },
                {
                    label: "Build more",
                    click: () => console.log("Build more clicked"),
                }
            ],
        }
    ]);

    Menu.setApplicationMenu(menu);
}

module.exports = createMenu;