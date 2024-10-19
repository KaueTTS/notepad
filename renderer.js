window.electronAPI.fileOpened((event, data) => {
    const textArea = document.getElementById("text-area")
    textArea.value = data
})