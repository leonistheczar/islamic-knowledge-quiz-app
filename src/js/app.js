//  LocalStorage Import
import { initLocalStorage, getLocalStorageItem }  from "./storage.js";
// Animations Import
import { pageLoadAnimation, pageExitAnimation, dialogOpenAnimation, dialogCloseAnimation } from "./animations.js";
import { initAPI }  from "./api.js";
let apiData = await initAPI();
// UI Import as variables
import UI from "./ui.js";
const ui = UI().UISelectors();
// Init Event Listener
document.addEventListener("DOMContentLoaded", async () => {
    // Init localStorage
    initLocalStorage();
    // Animation
    dialogOpenAnimation();
    // Get API DATA
    console.log(apiData);
});
// Dialog Close Event Listener
ui.closeDialogBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialogCloseAnimation();
})
// Start Button Event Listener
ui.startBtn.addEventListener("click", () => {
    if(ui.nameInput.value.trim() === "") {
        alert("Please enter your name to start the quiz.");
        return;
    }
    let user = JSON.parse(localStorage.getItem("user")) || {}; 
    user.name = ui.nameInput.value.trim();  
    localStorage.setItem("user", JSON.stringify(user));
    pageExitAnimation(() => {
        ui.mainContent.classList.add("hidden");

        // DOM Update regarding quiz categories
        const userName = user.name; 
        let html = `
            <div id="main-content" class="bg-(--main-background) w-fit px-12 py-6 flex flex-col justify-center text-center mt-8">
                <h1 class="text-5xl" style="color: var(--text-main)">Welcome, ${userName}</h1>
                <p class="my-4 text-xl text-left">Select any category from the following 3 categories:</p>
                <h2 class="text-3xl font-bold my-4">Categories</h2>
                <ul class="space-y-2 flex flex-col items-start gap-y-4">
                    <li class="w-full text-left px-4 py-2 text-2xl border-2 rounded-lg border-(--main-primary)"><a class="w-full" href="#">🕋 ${apiData.categories[0].name}</a></li>
                    <li class="w-full text-left px-4 py-2 text-2xl border-2 rounded-lg border-(--main-primary)"><a class="w-full" href="#">⭐ ${apiData.categories[1].name}</a></li>
                    <li class="w-full text-left px-4 py-2 text-2xl border-2 rounded-lg border-(--main-primary)"><a class="w-full" href="#">📖 ${apiData.categories[2].name}</a></li>
                </ul>
            <button id="quiz-start-btn"
              class="text-xl bg-(--main-accent) mt-4 p-4 font-semibold rounded-md hover:bg-[#faf0e0]" type="button">Let's
              Start Quiz</button>
            </div>
        `;
        ui.categoriesContent.innerHTML = html;

    });
});