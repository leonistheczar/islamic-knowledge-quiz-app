// LocalStorage Import
import {
  initLocalStorage,
  getUser,
  updateUserName,
  updateCategory,
  updateQuizScores,
  getTheme,
  updateTheme,
  resetStorage
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
const categoryEmojis = ["🕋", "🕊️", "📖", "💠", "📜", "🌿"];
let apiData = null;
// UI Import as variables
import UI from "./ui.js";
const ui = UI().UISelectors();
window.history.scrollRestoration = "manual";

// Init localStorage
initLocalStorage();
// Init Event Listener
document.addEventListener("DOMContentLoaded", async () => {
  const theme = getTheme();
  if (theme === "dark") {
    ui.headerImgDark.classList.remove("hidden")
    ui.headerImgLight.classList.add("hidden")
    ui.toggler.checked = true;
    ui.html.classList.add("dark")
  }
  else if(theme === "light"){
    ui.headerImgLight.classList.remove("hidden")
    ui.headerImgDark.classList.add("hidden")
    ui.toggler.checked = false;
    ui.html.classList.remove("dark")
  }
  // // Check for quiz page access (Test-Case)
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
    if (user.name === "") {
      window.location.href = "index.html";
    }
  }
  if (
    window.location.href.includes("index.html") ||
    window.location.pathname === "/" ||
    window.location.href.includes("about.html") ||
    window.location.href.includes("contact.html")
  ) {
    window.scrollTo(0, 0);
    // Get API DATA
    try {
      apiData = await initAPI();
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
    console.log("API Data:", apiData);
    console.log(ui.toggler);
  }
});

// Theme toggler
ui.toggler.addEventListener("change", (e) => {
  if(e.target.checked){
    ui.headerImgDark.classList.remove("hidden")
    ui.headerImgLight.classList.add("hidden")
    updateTheme("dark");
    ui.html.classList.add("dark")
  }
  else{
    ui.headerImgLight.classList.remove("hidden")
    ui.headerImgDark.classList.add("hidden")
    ui.html.classList.remove("dark")
    updateTheme("light");
  }
})
// index.html event listeners
if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html" ||
  window.location.pathname.endsWith("/index.html")
) {
  const user = getUser();
  // Animation
    if (user.name === "") {
      console.log(user);
      ui.introDialog.classList.remove("hidden");
      dialogOpenAnimation();
    }
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
      let apiCategories = apiData.categories;
      let html = apiCategories
        .map(
          (category, index) => `
  <li id="category-${index}" data-category="${index}"
      class="category-item dark:text-[#180f02] group relative w-full rounded-xl overflow-hidden
             bg-white border-2 transition-all duration-300 cursor-pointer
             hover:translate-x-1 hover:shadow-lg"
      style="border-color: var(--main-primary-5)">
    
    <div class="absolute top-0 left-0 w-1 h-full transition-transform duration-300 
                scale-y-0 group-hover:scale-y-100"
         style="background-color: var(--main-primary)"></div>
    
    <a href="#"
       class="relative z-10 flex items-center justify-between 
              w-full px-6 py-5 no-underline">
      
      <div class="flex items-center gap-4">
        <span class="text-xl font-semibold">
          ${categoryEmojis[index]} ${category.name}
        </span>
      </div>
      
      <i class="uil uil-check-circle text-3xl opacity-0 scale-0 
                transition-all duration-300"
         style="color: var(--main-secondary)"></i>
    </a>
  </li>
`
        )
        .join("");
      ui.categoriesList.innerHTML = html;
    });
  });
// Directly go to categories (if user existed)
ui.categoriesBtn.addEventListener("click", () => {
    const user = getUser();
    if(user){
      const enteredName = user.name
      const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
      if (enteredName === "" || !nameRegex.test(enteredName)) {
        alert("User not exists, please enter your username, then proceed.");
        resetStorage();
        return;
      }
      pageExitAnimation(() => {
        ui.mainScreen.classList.add("hidden");
        ui.categoriesScreen.classList.remove("hidden");
        ui.logUserName.textContent = enteredName;
        let apiCategories = apiData.categories;
        let html = apiCategories
          .map(
            (category, index) => `
    <li id="category-${index}" data-category="${index}"
        class="category-item dark:text-[#180f02] group relative w-full rounded-xl overflow-hidden
               bg-white border-2 transition-all duration-300 cursor-pointer
               hover:translate-x-1 hover:shadow-lg"
        style="border-color: var(--main-primary-5)">
      
      <div class="absolute top-0 left-0 w-1 h-full transition-transform duration-300 
                  scale-y-0 group-hover:scale-y-100"
           style="background-color: var(--main-primary)"></div>
      
      <a href="#"
         class="relative z-10 flex items-center justify-between 
                w-full px-6 py-5 no-underline"
         style="color: var(--main-text)">
        
        <div class="flex items-center gap-4">
          <span class="text-xl font-semibold">
            ${categoryEmojis[index]} ${category.name}
          </span>
        </div>
        
        <i class="uil uil-check-circle text-3xl opacity-0 scale-0 
                  transition-all duration-300"
           style="color: var(--main-secondary)"></i>
      </a>
    </li>
  `
          )
          .join("");
        ui.categoriesList.innerHTML = html;
      });
    }
})
  // Handle category selection
  let selectedCategory = null;
  let categoryID = null;
  let previousItem = null;
  let resetUser = ui.resetUser;
  if(resetUser){
    resetUser.addEventListener("click", () => {
      if(confirm("Are you sure to reset yourself as a user?")){
        resetStorage();
        window.location.reload();
      }
    })
  }
  ui.categoriesList.addEventListener("click", (e) => {
    e.preventDefault();
    const anchor = e.target.closest("a");
    if (anchor) {
      const categoryItem = anchor.closest(".category-item");
      categoryID = categoryItem.getAttribute("data-category");

      if (categoryID !== null) {
        // Remove selection from all items
        document.querySelectorAll(".category-item").forEach((item) => {
          const icon = item.querySelector(".uil-check-circle");
          const leftBorder = item.querySelector("div[class*='absolute']");

          icon.classList.remove("opacity-100", "scale-100");
          icon.classList.add("opacity-0", "scale-0");

          item.style.borderColor = "var(--main-primary-5)";
          item.style.background = "white";

          if (leftBorder) {
            leftBorder.style.backgroundColor = "var(--main-primary)";
          }
        });

        // Add selection to clicked item
        const icon = categoryItem.querySelector(".uil-check-circle");
        const leftBorder = categoryItem.querySelector("div[class*='absolute']");

        icon.classList.remove("opacity-0", "scale-0");
        icon.classList.add("opacity-100", "scale-100");

        categoryItem.style.borderColor = "var(--main-primary)";
        categoryItem.style.background =
          "linear-gradient(135deg, var(--main-primary-5) 0%, white 100%)";
        categoryItem.style.boxShadow = "0 4px 12px rgba(244, 162, 47, 0.2)";

        if (leftBorder) {
          leftBorder.style.backgroundColor = "var(--main-secondary)";
          leftBorder.classList.add("scale-y-100");
        }

        selectedCategory = categoryID;
        previousItem = categoryItem;
      }
    }
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
  console.log(selectedCategoryID)
  console.log(apiData)

  // Category shown in quiz-intro
  let category = ui.quizNoticeCategory;
  category.textContent = `"${selectedCategory}"`;

  let progressWidth = 0;
  let currentProgress = 0;
  let currentQuestionIndex = 0;
  let quizQuestions = [];
  let quizAnswers = []; // Quiz Answers
  let userAnswers = []; // User Answers (Quiz and User answers both will be compared to finalize result)
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
    }, 1000);
  }
  function displayQuestion(index) {
    const questionIndex = quizQuestions[index];
    // Store correct answer after initialization
    const answers = apiData.categories[selectedCategoryID].questions;
    answers.map((index) => {
      quizAnswers.push(index.correctAnswer);
    });
    // DOM Question Display
    ui.quizQuestion.textContent = `(${index + 1}) ${questionIndex.question}`;

    // Update choices
    const choicesList = ui.quizChoiceList;
    const choicesHTML = questionIndex.options
      .map((choice, i) => {
        const isSelected = userAnswers[currentQuestionIndex] === choice;
        const selectedClass = isSelected ? "selected" : "";
        const selectedStyle = isSelected
          ? 'style="background-color: var(--main-secondary); color: white;"'
          : "";

        return `
        <li class="quiz-choice-item ${selectedClass} border-[#252525] p-4 mb-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]"  
            data-choice="${i}"
            ${selectedStyle}>
          <span class="text-lg">${choice}</span>
        </li>
      `;
      })
      .join("");
    choicesList.innerHTML = choicesHTML;

    // Add click event listeners to all choices
    document.querySelectorAll(".quiz-choice-item").forEach((item) => {
      item.addEventListener("click", function () {
        // Remove selection from all choices
        document.querySelectorAll(".quiz-choice-item").forEach((choice) => {
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
      quizBtn.classList.add("bg-(--main-accent-10)");
      quizBtn.innerHTML = `Submit Quiz <i class="uil uil-check-circle"></i>`;
    } else {
      quizBtn.id = "next-choice";
      quizBtn.classList.remove("bg-(--main-accent-10)");
      quizBtn.classList.add("bg-(--main-secondary)");
      quizBtn.innerHTML = 'Next <i class="uil uil-arrow-right"></i>';
    }
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
    if (ui.progressCompleted) {
      ui.progressCompleted.textContent = `Quiz Progress: ${currentProgress}% completed`;
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
      ui.answerCategory.textContent = `"${selectedCategory}"`;
    }

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function displayAnswerBreakdown() {
    // Show the answers section
    const answersSection = ui.quizAnswersSection;
    answersSection.classList.remove("hidden");

    const breakdownContainer = ui.quizAnswerBreakdown;

    if (!breakdownContainer) return;

    const breakdownHTML = quizQuestions
      .map((question, index) => {
        const isCorrect = userAnswers[index] === quizAnswers[index];
        const statusClass = isCorrect ? "text-green-500" : "text-red-500";
        const statusIcon = isCorrect ? "✓" : "✗";
        const borderColor = isCorrect ? "border-green-500" : "border-red-500";
        const bgColor = isCorrect ? "bg-green-50" : "bg-red-50";

        return `
        <div class="mb-6 p-6 border-2 rounded-lg ${borderColor} ${bgColor} text-[#000] transition-all hover:shadow-md">
          <div class="flex items-start justify-between mb-4">
            <h4 class="font-bold text-xl flex-1">Question ${index + 1}</h4>
            <span class="${statusClass} text-3xl font-bold">${statusIcon}</span>
          </div>
          <p class="mb-4 text-lg font-medium">${question.question}</p>
          <div class="space-y-3 pl-4 border-l-4 ${
            isCorrect ? "border-green-500" : "border-red-500"
          }">
            <p class="text-base">
              <span class="font-semibold">Your Answer:</span> 
              <span class="${
                isCorrect
                  ? "text-green-700 font-semibold"
                  : "text-red-700 font-semibold"
              }">${userAnswers[index] || "Not answered"}</span>
            </p>
            ${
              !isCorrect
                ? `
              <p class="text-base">
                <span class="font-semibold">Correct Answer:</span> 
                <span class="text-green-700 font-semibold">${
                  quizAnswers[index] || "Not answered"
                }</span>
              </p>
            `
                : ""
            }
          </div>
        </div>
      `;
      })
      .join("");

    breakdownContainer.innerHTML = breakdownHTML;
    // Scroll to breakdown
    answersSection.scrollIntoView({ behavior: "smooth", block: "start" });
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
    updateQuizScores(quizScore);
    // Show results screen
    displayResults();
  }
  function quizProgress() {
    ui.quizProgress.classList.remove("opacity-0");
    progressWidth = parseInt(ui.quizProgress.textContent) || 0;
    progressWidth += 5;
    // Update text and width
    currentProgress = progressWidth;
    ui.quizProgress.textContent = progressWidth + "%";
    ui.quizProgress.style.width = progressWidth + "%";
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
    } else if (selectedCategory === "Prophets in Islam") {
      quizCategory.textContent = `⭐ ${selectedCategory}`;
    } else if (selectedCategory === "Quran Knowledge") {
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
    if (
      userAnswers[currentQuestionIndex] === null ||
      userAnswers[currentQuestionIndex] === undefined
    ) {
      alert("Please select an answer before proceeding.");
      return;
    }
    console.log(
      "Question",
      currentQuestionIndex + 1,
      "Answer:",
      userAnswers[currentQuestionIndex]
    );
    if (ui.quizQuestionBtn.id === "next-choice") {
      // Move to next question
      currentQuestionIndex++;
      displayQuestion(currentQuestionIndex);
      quizProgress();
    } else if (ui.quizQuestionBtn.id === "submit-quiz") {
      quizProgress();
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  // Home Button
  if (ui.homeBtn) {
    ui.homeBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  ui.quizBtn.addEventListener("click", () =>
    initiateQuiz(user, selectedCategory)
  );
}
