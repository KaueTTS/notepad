const { app, Menu } = require("electron")
const openFile = require("./openFile")
const saveFile = require("./saveFile")
const createAboutWindow = require("./createAboutWindow")

function createMenu(mainWindow) {
    const isMac = process.platform === "darwin"
    
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
            label: "Arquivo",
            submenu: [
                isMac ? { label: "Fechar", role: "close" } : { label: "Fechar", role: "quit" },
                {
                    label: "Abrir arquivo",
                    accelerator: "CmdOrCtrl+O",
                    click: () => openFile(mainWindow),
                },
                {
                    label: "Salvar arquivo",
                    accelerator: "CmdOrCtrl+S",
                    click: () => {
                        const textArea = mainWindow.webContents.executeJavaScript(`
                            document.getElementById("text-area").value
                        `);

                        textArea.then((content) => {
                            saveFile(null, content);
                        })
                    },
                },
            ],
        },

        // Aba edit
        {
            label: "Editar",
            submenu: [
                { label: "Desfazer", role: "undo" },
                { label: "Refazer", role: "redo" },
                { type: "separator" },
                { label: "Cortar", role: "cut" },
                { label: "Copiar", role: "copy" },
                { label: "Colar", role: "paste" },
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
                : [{ label: "Deletar", role: "delete" }, { type: "separator"}, { label: "Selecionar tudo", role: "selectAll" }])
            ],
        },

        // aba view
        {
            label: "Visualizar",
            submenu: [
                { label: "Recarregar", role: "reload" },
                { label: "Forçar recarga", role: "forceReload" },
                { type: "separator" },
                { label: "Resetar zoom", role: "resetZoom" },
                { label: "Aumentar zoom", role: "zoomIn", accelerator: "CmdOrCtrl+="},
                { label: "Diminuir zoom", role: "zoomOut" },
                { type: "separator" },
                { label: "Tela cheia", role: "togglefullscreen" }
            ],
        },

        // aba window
        {
            label: "Janela",
            submenu: [
                { label: "Minimizar", role: "minimize" },
                ...(isMac
                    ? [{ type: "separator" }, { role: "front" }, { type: "separator" }, { role: "window" }]
                : [{ label: "Fechar", role: "close" }]),
            ],
        },

        // aba help
        {
            label: "Ajuda", role: "help",
            submenu: [ 
                {
                    label: "Sobre",
                    click: () => createAboutWindow(),
                },
                {
                    label: "Linguagem",
                    click: async () => {
                        const { shell } = require("electron")
                        await shell.openExternal("https://electronjs.org")
                    },
                },
            ],
        }
    ])

    Menu.setApplicationMenu(menu)
}

module.exports = createMenu