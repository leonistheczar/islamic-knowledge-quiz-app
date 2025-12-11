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
            // Categories 
            categoriesScreen: document.querySelector("#categories-screen"),
            categoriesScreenContainer: document.querySelector("#categories-screen-container"),
            categoriesContent: document.querySelector("#categories-content"),
            categoriesList: document.querySelector("#categories-list"),
            quizStart: document.querySelector("#quiz-start-btn"),
            logUserName: document.querySelector("#user-name"),
        }
    }
    return{
        UISelectors
    }
}
export default UI;