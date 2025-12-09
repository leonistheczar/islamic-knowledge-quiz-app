const UI = () => {
    const UISelectors = () => {
        return {
            // Main Screen (Intro)
            mainScreen: document.querySelector("#main-screen"),
            mainScreenContainer: document.querySelector("#main-screen-container"),
            mainContent: document.querySelector("#main-content"),
            nameInput: document.querySelector('#name'),
            startBtn: document.querySelector('#start-btn'),
            // User Dialog
            dialogOverlay: document.querySelector("#start-info"),
            dialogBox: document.querySelector("#dialog-box"),
            closeDialogBtn: document.querySelector("#close-dialog"),
            // Categories Screen
            categoriesContent: document.querySelector("#categories-content"),
        }
    }
    return{
        UISelectors
    }
}
export default UI;