//  LocalStorage Import
import {
  initLocalStorage,
  getLocalStorageItem,
  getUser,
  updateUserName,
  updateCategory,
  updateQuizScores,
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
            <li id="category-1" class="category-item w-full text-left text-xl border-2 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer" style="border-color: var(--main-text)" data-category="0">
                <a class="flex items-center justify-between gap-3 w-full px-6 py-4 no-underline" href="#" style="color: var(--text-main)">
                    <span class="">🕋 ${apiData.categories[0].name}</span>
                    <i class="hidden uil uil-check-circle text-(--main-secondary) text-4xl"></i>
                </a>
            </li>
            <li id="category-2" class="category-item w-full text-left text-xl border-2 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer" style="border-color: var(--main-text)" data-category="1">
                <a class="flex items-center justify-between gap-3 w-full px-6 py-4 no-underline" href="#" style="color: var(--text-main)">
                    <span class="">⭐ ${apiData.categories[1].name}</span>
                    <i class="hidden uil uil-check-circle text-(--main-secondary) text-4xl"></i>
                </a>
            </li>
            <li id="category-3" class="category-item w-full text-left text-xl border-2 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer" style="border-color: var(--main-text)" data-category="2">
                <a class="flex items-center justify-between gap-3 w-full px-6 py-4 no-underline" href="#" style="color: var(--text-main)">
                    <span class="">📖 ${apiData.categories[2].name}</span>
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
  
  // Category shown in quiz-intro
  let category = ui.quizNoticeCategory;
  category.textContent = `"${selectedCategory}"`;

  let currentQuestionIndex = 0;
  let quizQuestions = [];
  let quizAnswers = [];     // Quiz Answers 
  let userAnswers = [];     // User Answers (Quiz and User answers both will be compared to finalize result)
  let quizScore;
  let timerInterval;
  
  function quizTime() {
    let timer = 120;
    let timesOut;
    const quizTimer = ui.quizTimer;  
    timerInterval = setInterval(() => {
      let minutes = Math.floor(timer / 60);
      let seconds = timer % 60;
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      timer--;
      quizTimer.textContent = `${minutes}:${seconds}`;
      
      if (timer <= 20) {
        quizTimer.classList.add("scale-pulse", "text-red-500");
      }
      if (timer === 0) {
        timesOut = "00:00";
        quizTimer.classList.remove("scale-pulse");
        quizTimer.textContent = timesOut;
        // Auto-submit quiz when time runs out
        clearInterval(timerInterval);
        alert("Time's up! Your quiz will be submitted automatically.");
        submitQuiz();
      }
    }, 10);
  }
  function displayQuestion(index) {
    const questionIndex = quizQuestions[index];    
    // Store correct answer after initialization
    const answers = apiData.categories[selectedCategoryID].questions;
    answers.map((index) => {
      quizAnswers.push(index.correctAnswer);
    })
    // DOM Question Display
    ui.quizQuestion.textContent = `(${index + 1}) ${questionIndex.question}`;
    
    // Update choices 
    const choicesList = ui.quizChoiceList;
    const choicesHTML = questionIndex.options.map((choice, i) => {
      const isSelected = userAnswers[currentQuestionIndex] === choice;
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
        
        const choiceIndex = parseInt(this.getAttribute("data-choice"));
        // Store the actual option text from the options array for accurate comparison
        userAnswers[currentQuestionIndex] = questionIndex.options[choiceIndex];
      });
    });
    
    // Update next button text
    const quizBtn = ui.quizQuestionBtn;
    if (index === quizQuestions.length - 1) {
      quizBtn.id = "submit-quiz";
      quizBtn.classList.remove("bg-(--main-secondary)");
      quizBtn.classList.add("bg-(--main-accent)");
      quizBtn.innerHTML = `Submit Quiz <i class="uil uil-check-circle"></i>`;
    } else {
      quizBtn.id = "next-choice";
      quizBtn.classList.remove("bg-(--main-accent)");
      quizBtn.classList.add("bg-(--main-secondary)");
      quizBtn.innerHTML = 'Next <i class="uil uil-arrow-right"></i>';
    }
  }
  
  // Show answers of quiz for debugging
  function showAnswers() {
    quizAnswers.forEach((answer, i) => {
      const isCorrect = userAnswers[i] === answer;
      const status = isCorrect ? '✓ CORRECT' : '✗ WRONG';
    });
    
    console.log(`\nFinal Score: ${quizScore}/${quizQuestions.length}`);
  }
  
  function displayResults() {
    const user = getUser();
    const quizCard = ui.quizCard;
    const resultsSection = ui.quizResults;
    const highestScore = user.highestScore;
    quizCard.classList.add("hidden");
    resultsSection.classList.remove("hidden");
    
    // Calculate percentage and get result message
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    let resultMessage = "";
    let resultEmoji = "";
    
    if (percentage >= 90) {
      resultMessage = "Outstanding! Excellent work! 🌟";
      resultEmoji = "🎉";
    } else if (percentage >= 75) {
      resultMessage = "Great job! Keep it up! 👏";
      resultEmoji = "😊";
    } else if (percentage >= 60) {
      resultMessage = "Good effort! Room for improvement! 📚";
      resultEmoji = "👍";
    } else {
      resultMessage = "Keep practicing! You'll do better next time! 💪";
      resultEmoji = "📖";
    }
    
    // Update results UI elements
    if (ui.quizResultScore) {
      ui.quizResultScore.textContent = `${quizScore}/${quizQuestions.length}`;
    }
    if (ui.quizHighestScore) {
      ui.quizHighestScore.textContent = `${highestScore}/${quizQuestions.length}`;
    }
    if (ui.quizResultPercentage) {
      ui.quizResultPercentage.textContent = `${percentage}%`;
    }
    if (ui.quizResultMessage) {
      ui.quizResultMessage.textContent = resultMessage;
    }
    if (ui.quizResultEmoji) {
      ui.quizResultEmoji.textContent = resultEmoji;
    }
    if (ui.quizResultCategory) {
      ui.quizResultCategory.textContent = selectedCategory;
    }
    if (ui.answerCategory) {
      ui.answerCategory.textContent = selectedCategory;
    }
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  function displayAnswerBreakdown() {
    // Show the answers section
    const answersSection = ui.quizAnswersSection;
    answersSection.classList.remove("hidden");
    
    const breakdownContainer = ui.quizAnswerBreakdown;
    
    if (!breakdownContainer) return;
    
    const breakdownHTML = quizQuestions.map((question, index) => {
      const isCorrect = userAnswers[index] === quizAnswers[index];
      const statusClass = isCorrect ? 'text-green-500' : 'text-red-500';
      const statusIcon = isCorrect ? '✓' : '✗';
      const borderColor = isCorrect ? 'border-green-500' : 'border-red-500';
      const bgColor = isCorrect ? 'bg-green-50' : 'bg-red-50';
      
      return `
        <div class="mb-6 p-6 border-2 rounded-lg ${borderColor} ${bgColor} transition-all hover:shadow-md">
          <div class="flex items-start justify-between mb-4">
            <h4 class="font-bold text-xl flex-1">Question ${index + 1}</h4>
            <span class="${statusClass} text-3xl font-bold">${statusIcon}</span>
          </div>
          <p class="mb-4 text-lg font-medium">${question.question}</p>
          <div class="space-y-3 pl-4 border-l-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}">
            <p class="text-base">
              <span class="font-semibold">Your Answer:</span> 
              <span class="${isCorrect ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}">${userAnswers[index] || 'Not answered'}</span>
            </p>
            ${!isCorrect ? `
              <p class="text-base">
                <span class="font-semibold">Correct Answer:</span> 
                <span class="text-green-700 font-semibold">${quizAnswers[index] || "Not answered"}</span>
              </p>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
    
    breakdownContainer.innerHTML = breakdownHTML;
    
    // Scroll to breakdown
    answersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  function submitQuiz() {
    const user = getUser();
    // Stop the timer
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    quizScore = 0;
    // Calculate score by comparing user answers with correct answers
    quizQuestions.forEach((question, index) => {
      if (userAnswers[index] === quizAnswers[index]) {
        quizScore++;
      }
    });
    // Updates the scores in LocalStorage as well
      updateQuizScores(quizScore)
    // Show results screen
    displayResults();
  }
  function initiateQuiz(user, selectedCategory, index) {
    const quizIntro = ui.quizIntro;
    const quizCard = ui.quizCard;
    // Quiz Card Appearance
    quizIntro.classList.add("hidden");
    quizCard.classList.remove("hidden");
    // Dynamic DOM
    let quizCategory = ui.quizCategory;
    if (selectedCategory === "Pillars of Islam") {
      quizCategory.textContent = `🕋 ${selectedCategory}`;
    }
    else if (selectedCategory === "Prophets in Islam") {
      quizCategory.textContent = `⭐ ${selectedCategory}`;
    }
    else if (selectedCategory === "Quran Knowledge") {
      quizCategory.textContent = `📖 ${selectedCategory}`;
    }
    // Get Questions
    quizQuestions = apiData.categories[selectedCategoryID].questions;
    // Reset arrays
    quizAnswers = [];
    userAnswers = new Array(quizQuestions.length).fill(null);
    // Display first question
    currentQuestionIndex = 0;
    displayQuestion(currentQuestionIndex);
    // Start timer
    quizTime();
  }
  // Next button event listener
  ui.quizQuestionBtn.addEventListener("click", () => {
    // Check if answer is selected
    if (userAnswers[currentQuestionIndex] === null || userAnswers[currentQuestionIndex] === undefined) {
      alert("Please select an answer before proceeding.");
      return;
    }
    console.log("Question", currentQuestionIndex + 1, "Answer:", userAnswers[currentQuestionIndex]);
    if (ui.quizQuestionBtn.id === "next-choice") {
      // Move to next question
      currentQuestionIndex++;
      displayQuestion(currentQuestionIndex);
    }
    else if (ui.quizQuestionBtn.id === "submit-quiz") {
      submitQuiz();
    }
  });
  // Show Result Button Event Listener
  if (ui.quizResultBtn) {
    ui.quizResultBtn.addEventListener("click", () => {
      displayAnswerBreakdown();
    });
  }
  // Retake Quiz Button
  if (ui.retakeQuizBtn) {
    ui.retakeQuizBtn.addEventListener("click", () => {
      // Hide results and answers, show intro
      ui.quizResults.classList.add("hidden");
      ui.quizAnswersSection.classList.add("hidden");
      ui.quizIntro.classList.remove("hidden");
      
      // Reset quiz data
      currentQuestionIndex = 0;
      quizAnswers = [];
      userAnswers = [];
      quizScore = 0;
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  // Home Button  
  if (ui.homeBtn) {
    ui.homeBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
  
  ui.quizBtn.addEventListener("click", () => initiateQuiz(user, selectedCategory));
}