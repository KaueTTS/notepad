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
    ]);

    Menu.setApplicationMenu(menu);
}

module.exports = createMenu;