//  LocalStorage Import
import {
  initLocalStorage,
  getLocalStorageItem,
  getUser,
  updateUserName,
} from "./storage.js";
// Animations Import
import {
  pageLoadAnimation,
  pageExitAnimation,
  dialogOpenAnimation,
  dialogCloseAnimation,
  categoriesLoad,
} from "./animations.js";
import { initAPI } from "./api.js";
let apiData;
// UI Import as variables
import UI from "./ui.js";
const ui = UI().UISelectors();

window.history.scrollRestoration = "manual";
// Init Event Listener
document.addEventListener("DOMContentLoaded", async () => {
   window.scrollTo(0, 0); 
  // Init localStorage
  initLocalStorage();
  // Animation
  dialogOpenAnimation();
  // Get API DATA
  try {
    apiData = await initAPI();
  } catch (error) {
    console.error("Error fetching API data:", error);
  }
  console.log("API Data:", apiData);
});

// Dialog Close Event Listener
ui.closeDialogBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialogCloseAnimation();
  pageLoadAnimation();
});

// Start Button Event Listener
ui.startBtn.addEventListener("click", () => {
  if (ui.nameInput.value.trim() === "") {
    alert("Please enter your name to start the quiz.");
    return;
  }
  const user = updateUserName(ui.nameInput.value.trim());

  pageExitAnimation(() => {
    ui.mainContent.classList.add("hidden");

    // DOM Update regarding quiz categories
    categoriesLoad();
    const userName = user.name;
    let html = `
<div id="main-content" class="bg-(--main-primary-5) w-full rounded-xl shadow-lg px-12 py-8 flex flex-col justify-center text-center">
        <h1 class="text-5xl font-bold mb-6" style="color: var(--text-main)">Welcome, ${userName}!</h1>
        <p class="mb-6 text-xl text-left" style="color: var(--text-main)">Select a category to begin your journey:</p>
        <h2 class="text-3xl font-bold mb-6" style="color: var(--text-main)">Categories</h2>
        <ul class="space-y-4 flex flex-col items-stretch mb-8">
            <li id="category-item" class="category-item w-full text-left px-6 py-4 text-2xl border-2 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer" style="border-color: var(--main-text)" data-category="0">
                <a class="flex items-center gap-3 w-full no-underline" href="#" style="color: var(--text-main)">
                    <span class="text-3xl">🕋</span>
                    <span>${apiData.categories[0].name}</span>
                </a>
            </li>
            <li id="category-item" class="category-item w-full text-left px-6 py-4 text-2xl border-2 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer" style="border-color: var(--main-text)" data-category="1">
                <a class="flex items-center gap-3 w-full no-underline" href="#" style="color: var(--text-main)">
                    <span class="text-3xl">⭐</span>
                    <span>${apiData.categories[1].name}</span>
                </a>
            </li>
            <li id="category-item" class="category-item w-full text-left px-6 py-4 text-2xl border-2 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer" style="border-color: var(--main-text)" data-category="2">
                <a class="flex items-center gap-3 w-full no-underline" href="#" style="color: var(--text-main)">
                    <span class="text-3xl">📖</span>
                    <span>${apiData.categories[2].name}</span>
                </a>
            </li>
        </ul>
        
        <a id="quiz-start-btn"
            href="quiz.html" 
            class="text-xl bg-(--main-accent) font-semibold py-4 px-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95" 
            type="button">
            Let's Start Quiz 🚀
        </a>
    </div>
        `;
    ui.categoriesContent.innerHTML = html;
  });
});
