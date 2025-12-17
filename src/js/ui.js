const UI = () => {
    const UISelectors = () => {
        return {
            // HTML
            html: document.querySelector("#root"),
            toggler: document.querySelector("#toggle"),
            introDialog: document.querySelector('#intro-guide-dialog'),
            headerImgLight: document.querySelector("#header-img-light"),
            headerImgDark: document.querySelector("#header-img-dark"),
            // Main Screen (Intro)
            mainScreen: document.querySelector("#main-screen"),
            mainScreenContainer: document.querySelector("#main-screen-container"),
            mainContent: document.querySelector("#main-content"),
            nameInput: document.querySelector('#name'),
            startBtn: document.querySelector('#start-btn'),
            categoriesBtn: document.querySelector("#categories-btn"),
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
            resetUser: document.querySelector("#reset-user"),
            // Quiz Screen
            quizIntro: document.querySelector("#quiz-intro"),
            quizCard: document.querySelector("#quiz-card"),
            quizBtn: document.querySelector("#quiz-btn"),
            quizTimer: document.querySelector("#quiz-timer"),
            quiz: document.querySelector("#quiz"),
            quizCategory: document.querySelector("#quiz-category"),
            quizNoticeCategory: document.querySelector("#category"),
            quizContent: document.querySelector("#quiz-content"),
            quizQuestion: document.querySelector("#quiz-question"),
            quizChoiceList: document.querySelector("#quiz-choices"),
            quizQuestionBtn: document.querySelector("#quiz-question-btn"),
            quizProgress: document.querySelector("#quiz-progress"),
            progressCompleted: document.querySelector("#progress-completed"),
            // Quiz Results Section
            quizResults: document.querySelector("#quiz-results"),
            quizResultScore: document.querySelector("#quiz-result-score"),
            quizHighestScore: document.querySelector("#quiz-highest-score"),
            quizResultPercentage: document.querySelector("#quiz-result-percentage"),
            quizResultMessage: document.querySelector("#quiz-result-message"),
            quizResultEmoji: document.querySelector("#quiz-result-emoji"),
            quizResultCategory: document.querySelector("#quiz-result-category"),
            // Quiz Answers/Breakdown Section
            quizAnswersSection: document.querySelector("#quiz-answers"),
            answerCategory: document.querySelector("#answer-category"),
            quizAnswerBreakdown: document.querySelector("#quiz-answer-breakdown"),
            // Action Buttons
            quizResultBtn: document.querySelector("#quiz-result-btn"),
            retakeQuizBtn: document.querySelector("#retake-quiz-btn"),
            backToCategoriesBtn: document.querySelector("#back-to-categories-btn"),
            homeBtn: document.querySelector("#home-btn")
        }
    }
    return{
        UISelectors
    }
}
export default UI;