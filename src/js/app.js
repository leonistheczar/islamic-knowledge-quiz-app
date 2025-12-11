//  LocalStorage Import
import {
  initLocalStorage,
  getLocalStorageItem,
  getUser,
  updateUserName,
  updateCategory
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
  const enteredName = ui.nameInput.value.toUpperCase().trim();
  const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/
  if (enteredName === "" && !nameRegex.test(enteredName)) {
    alert("Please enter your name to start the quiz.");
    return;
  }
  updateUserName(enteredName);

  pageExitAnimation(() => {
    ui.mainScreen.classList.add("hidden");
    ui.categoriesScreen.classList.remove("hidden");
    ui.logUserName.textContent = enteredName;
    // DOM Update regarding quiz categories
    categoriesLoad();
    let html = `
            <li id="category-1" class="category-item w-full text-left text-2xl border-2 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer" style="border-color: var(--main-text)" data-category="0">
                <a class="flex items-center justify-between gap-3 w-full px-6 py-4 no-underline" href="#" style="color: var(--text-main)">
                    <span class="text-2xl">🕋 ${apiData.categories[0].name}</span>
                    <i class="hidden uil uil-check-circle text-(--main-secondary) text-4xl"></i>
                </a>
            </li>
            <li id="category-2" class="category-item w-full text-left text-2xl border-2 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer" style="border-color: var(--main-text)" data-category="1">
                <a class="flex items-center justify-between gap-3 w-full px-6 py-4 no-underline" href="#" style="color: var(--text-main)">
                    <span class="text-2xl">⭐ ${apiData.categories[1].name}</span>
                    <i class="hidden uil uil-check-circle text-(--main-secondary) text-4xl"></i>
                </a>
            </li>
            <li id="category-3" class="category-item w-full text-left text-2xl border-2 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer" style="border-color: var(--main-text)" data-category="2">
                <a class="flex items-center justify-between gap-3 w-full px-6 py-4 no-underline" href="#" style="color: var(--text-main)">
                    <span class="text-2xl">📖 ${apiData.categories[2].name}</span>
                    <i class="hidden uil uil-check-circle text-(--main-secondary) text-4xl"></i>
                </a>
            </li>
        `;
    ui.categoriesList.innerHTML = html;
  });
});
  // Handle category selection
  let selectedCategory = null;
  let previousAnchor = null;
  
  ui.categoriesList.addEventListener("click", (e) => {
  const anchor = e.target.closest('a');
  console.log(anchor);
  if(anchor) {
    // Get the "li"
    const categoryItem = anchor.parentElement.getAttribute("data-category");
    console.log(categoryItem);
    if(categoryItem !== null) {
      if(previousAnchor && previousAnchor !== anchor) {
        previousAnchor.lastElementChild.classList.add("hidden");
      }
      anchor.lastElementChild.classList.toggle("hidden");
      previousAnchor = anchor;
    }
    selectedCategory = categoryItem;
  }
  return false;
});
ui.quizStart.addEventListener("click", (e) => {
  const categoryAPI = apiData.categories[selectedCategory].name;
  updateCategory(categoryAPI);
});