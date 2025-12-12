//  LocalStorage Import
import {
  initLocalStorage,
  getLocalStorageItem,
  getUser,
  updateUserName,
  updateCategory,
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

// Init localStorage
initLocalStorage();
// Check for quiz page access (Test-Case)
if (window.location.pathname.endsWith("quiz.html")) {
  console.log("Quiz Page Accessed", );
  // Get API DATA
    try {
      apiData = await initAPI();
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
    console.log("API Data:", apiData);
  const user = getUser();
  console.log("User from localStorage:", user);
  if (user.name === '') {
    window.location.href = "index.html";
  }
} 
// Init Event Listener
document.addEventListener("DOMContentLoaded", async () => {
  if (window.location.href.includes("index.html")) {
    window.scrollTo(0, 0);
    // Animation
    dialogOpenAnimation();
    // Get API DATA
    try {
      apiData = await initAPI();
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
    console.log("API Data:", apiData);
  }
});

// index.html event listeners
if (window.location.href.includes("index.html")) {
  // Dialog Close Event Listener
  ui.closeDialogBtn.addEventListener("click", (e) => {
    console.log(ui.closeDialogBtn);
    e.preventDefault();
    dialogCloseAnimation();
    pageLoadAnimation();
  });

  // Start Button Event Listener
  ui.startBtn.addEventListener("click", () => {
    const enteredName = ui.nameInput.value.toUpperCase().trim();
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    if (enteredName === "" || !nameRegex.test(enteredName)) {
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
  let categoryID = null;
  let previousAnchor = null;

  ui.categoriesList.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    console.log(anchor);
    if (anchor) {
      // Get the "li"
      const categoryItem = anchor.parentElement.getAttribute("data-category");
      categoryID = categoryItem;
      if (categoryItem !== null) {
        if (previousAnchor && previousAnchor !== anchor) {
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
    const categoryAPI = apiData.categories[categoryID].name;
    updateCategory(categoryAPI, categoryID);
  });
}
// Quiz page
if (window.location.href.includes("quiz.html")) {
  // Get the selected category
  let user = getUser();
  const selectedCategory = user.categories.selectedCategory;
  const selectedCategoryID = user.categories.selectedCategoryID;
  const username = user.name;
  
  // Category shown in quiz-intro
  let category = ui.quizNoticeCategory;
  category.textContent = `"${selectedCategory}"`;
  
  // Track current question index and answers
  let currentQuestionIndex = 0;
  let quizQuestions = [];
  let userAnswers = [];
  
  function quizTime() {
    let timer = 120;
    let timesOut;
    const quizTimer = ui.quizTimer;  
    const counter = setInterval(() => {
      let minutes = Math.floor(timer / 60);
      let seconds = timer % 60;
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      timer--;
      quizTimer.textContent = `${minutes}: ${seconds}`;
      if(timer <= 20){
        quizTimer.classList.add("scale-pulse", "text-red-500");
      }
      if (timer === 0) {
        timesOut = "00:00";
        quizTimer.classList.remove("scale-pulse");
        quizTimer.textContent = timesOut.toLocaleString();
        clearInterval(counter);
        // TODO: Auto-submit quiz
      }
    }, 1000)
  }
  
  function displayQuestion(index) {
    const questionIndex = quizQuestions[index];
    
    // Update question text
    ui.quizQuestion.textContent = ` (0${index + 1}) ${questionIndex.question}`;
    
    // Update choices using template literal
    const choicesList = ui.quizChoiceList;
    
    const choicesHTML = questionIndex.options.map((choice, i) => {
      const isSelected = userAnswers[currentQuestionIndex] === i;
      const selectedClass = isSelected ? 'selected' : '';
      const selectedStyle = isSelected ? 'style="background-color: var(--main-secondary); color: white;"' : '';
      
      return `
        <li class="quiz-choice-item ${selectedClass} p-4 mb-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]" 
            style="border-color: var(--main-text)" 
            data-choice="${i}"
            ${selectedStyle}>
          <span class="text-lg">${choice}</span>
        </li>
      `;
    }).join('');
    
    choicesList.innerHTML = choicesHTML;
    
    // Add click event listeners to all choices
    document.querySelectorAll(".quiz-choice-item").forEach(item => {
      item.addEventListener("click", function() {
        // Remove selection from all choices
        document.querySelectorAll(".quiz-choice-item").forEach(choice => {
          choice.classList.remove("selected");
          choice.style.backgroundColor = "";
          choice.style.color = "";
        });
        
        // Mark this choice as selected
        this.classList.add("selected");
        this.style.backgroundColor = "var(--main-secondary)";
        this.style.color = "white";
        
        // Store the selected answer
        const choiceIndex = parseInt(this.getAttribute("data-choice"));
        userAnswers[currentQuestionIndex] = choiceIndex;
      });
    });
    
    // Update next button text
    const nextBtn = ui.quizChoiceNext;
    if (index === quizQuestions.length - 1) {
      nextBtn.innerHTML = 'Submit <i class="uil uil-check"></i>';
    } else {
      nextBtn.innerHTML = 'Next <i class="uil uil-arrow-right"></i>';
    }
  }
  
  function initiateQuiz(user, selectedCategory, index) {
    const quizIntro = ui.quizIntro;
    const quizCard = ui.quizCard;

    // Quiz Card Appearance
    quizIntro.classList.add("hidden");
    quizCard.classList.remove("hidden");
    console.log("Button Clicked");
    
    // Dynamic DOM
    let quizCategory = ui.quizCategory;
    quizCategory.textContent =` ${selectedCategory}`;
    
    // Get Questions
    quizQuestions = apiData.categories[selectedCategoryID].questions;
    console.log(apiData, quizQuestions);
    
    // Display first question
    currentQuestionIndex = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    displayQuestion(currentQuestionIndex);
    
    // Start timer
    quizTime();
  }
  
  // Next button event listener
  document.getElementById("next-choice").addEventListener("click", () => {
    // Check if answer is selected
    if (userAnswers[currentQuestionIndex] === null || userAnswers[currentQuestionIndex] === undefined) {
      alert("Please select an answer before proceeding.");
      return;
    }
    
    console.log("Question", currentQuestionIndex + 1, "Answer:", userAnswers[currentQuestionIndex]);
    
    // Move to next question or submit
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion(currentQuestionIndex);
    } else {
      // Quiz completed
      console.log("Quiz completed! All answers:", userAnswers);
      // TODO: Calculate score and show results
    }
  });
  
  ui.quizBtn.addEventListener("click", () => initiateQuiz(user, selectedCategory));
}