// LocalStorage Import
import {
  initLocalStorage,
  getUser,
  updateUserName,
  updateCategory,
  updateQuizScores,
  getTheme,
  updateTheme,
  resetStorage,
} from "./storage.js";
// Animations Import
import {
  pageLoadAnimation,
  pageExitAnimation,
  dialogOpenAnimation,
  dialogCloseAnimation,
  categoriesLoad,
  categorySelectAnimation,
  categoryDeselectAnimation,
  categoriesExitAnimation,
  quizIntroAnimation,
  quizIntroExitAnimation,
  quizCardEnterAnimation,
  choiceHoverAnimation,
  progressUpdateAnimation,
  stopTimerAnimation,
  quizResultsEnterAnimation,
  timerWarningAnimation,
  percentageRevealAnimation,
  answerBreakdownEnterAnimation,
  correctAnswerAnimation,
  incorrectAnswerAnimation,
} from "./animations.js";
import { initAPI } from "./api.js";
let apiData = null;
// Category Emojis
const categoryEmojis = ["🕋", "🕊️", "📖", "💠", "📜", "🌿"];
// UI Import as variables
import UI from "./ui.js";
const ui = UI().UISelectors();
window.history.scrollRestoration = "manual";

// Init localStorage
initLocalStorage();

// Determine current page
const isQuizPage = window.location.pathname.endsWith("quiz.html") || window.location.href.includes("quiz.html");
const isIndexPage = window.location.href.includes("index.html") || 
                    window.location.pathname === "/";

// Init Event Listener
document.addEventListener("DOMContentLoaded", async () => {
  // Theme Setup -- System Preference (runs on all pages)
  const theme = getTheme();
  if (theme === "dark") {
    ui.headerImgDark.classList.remove("hidden");
    ui.headerImgLight.classList.add("hidden");
    ui.toggler.checked = true;
    ui.html.classList.add("dark");
  } else if (theme === "light") {
    ui.headerImgLight.classList.remove("hidden");
    ui.headerImgDark.classList.add("hidden");
    ui.toggler.checked = false;
    ui.html.classList.remove("dark");
  }
  // Theme toggler (runs on all pages)
  ui.toggler.addEventListener("change", (e) => {
    if (e.target.checked) {
      ui.headerImgDark.classList.remove("hidden");
      ui.headerImgLight.classList.add("hidden");
      updateTheme("dark");
      ui.html.classList.add("dark");
    } else {
      ui.headerImgLight.classList.remove("hidden");
      ui.headerImgDark.classList.add("hidden");
      ui.html.classList.remove("dark");
      updateTheme("light");
    }
  });

  // QUIZ.HTML 
  if (isQuizPage) {
    // Get API DATA
    try {
      apiData = await initAPI();
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
    const user = getUser();
    // Check if user exists AND has selected a category
    if (!user || user.name === "" || !user.categories || !user.categories.selectedCategory) {
      alert("Redirecting: Invalid user or no category selected", user);
      window.location.href = "/index.html";
      return;
    }
   initQuizPage();
  }
  // INDEX.HTML 
  if (isIndexPage) {
    window.scrollTo(0, 0);
    // Get API DATA
    try {
      apiData = await initAPI();
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
    // Execute index.html execution(s)
    initIndexPage();
  }
});
// INDEX.HTML 
function initIndexPage() {
  // Utilities
  let selectedCategory = null;
  let categoryID = null;
  let previousItem = null;
  const user = getUser();
  function toTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()).trim();
  }
  // Animation
  if (user.name === "") {
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
    const enteredName = toTitleCase(ui.nameInput.value);
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    if (enteredName === "" || !nameRegex.test(enteredName)) {
      alert("Please enter your name to start the quiz.");
      return;
    }
    updateUserName(enteredName);
    pageExitAnimation(() => {
      ui.mainScreen.classList.add("hidden");
      ui.logUserName.textContent = enteredName;
      renderCategories();
      categoriesLoad();
    });
  });

  // Directly go to categories (if user existed)
  ui.categoriesBtn.addEventListener("click", () => {
    const user = getUser();
    if (user) {
      const enteredName = user.name;
      const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
      if (enteredName === "" || !nameRegex.test(enteredName)) {
        alert("User not exists, please enter your username, then proceed.");
        resetStorage();
        return;
      }
      pageExitAnimation(() => {
        ui.mainScreen.classList.add("hidden");
        ui.logUserName.textContent = enteredName;
        renderCategories();
        categoriesLoad();
      });
    }
  });

  // Reset User
  let resetUser = ui.resetUser;
  if (resetUser) {
    resetUser.addEventListener("click", () => {
      if (confirm("Are you sure to reset yourself as a user?")) {
        resetStorage();
        window.location.reload();
      }
    });
  }

  // Category Selection
  ui.categoriesList.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;
    e.preventDefault();

    const categoryItem = anchor.closest(".category-item");
    if (!categoryItem) return;
    selectedCategory = anchor.querySelector("span").textContent.trim();

    const categoryIDAttr = categoryItem.getAttribute("data-category");
    if (!categoryIDAttr) return;

    // Deselect previous item
    if (previousItem && previousItem !== categoryItem) {
      const prevIcon = previousItem.querySelector(".uil-check-circle");
      const prevBorder = previousItem.querySelector("div[class*='absolute']");

      prevIcon?.classList.remove("opacity-100", "scale-100");
      prevIcon?.classList.add("opacity-0", "scale-0");

      previousItem.style.borderColor = "var(--main-primary-5)";
      previousItem.style.background = "white";
      previousItem.style.boxShadow = "none";
      prevBorder && (prevBorder.style.backgroundColor = "var(--main-primary)");
      categoryDeselectAnimation(previousItem);
    }

    // Select current item
    const icon = categoryItem.querySelector(".uil-check-circle");
    const leftBorder = categoryItem.querySelector("div[class*='absolute']");

    icon?.classList.remove("opacity-0", "scale-0");
    icon?.classList.add("opacity-100", "scale-100");

    categoryItem.style.borderColor = "var(--main-primary)";
    categoryItem.style.background =
      "linear-gradient(135deg, var(--main-primary-5) 0%, white 100%)";
    categoryItem.style.boxShadow = "0 4px 12px rgba(244, 162, 47, 0.2)";

    leftBorder && (leftBorder.style.backgroundColor = "var(--main-secondary)");
    categorySelectAnimation(categoryItem);
    categoryID = categoryIDAttr;
    previousItem = categoryItem;
  });

  // Quiz Start
  ui.quizStart.addEventListener("click", (e) => {
    e.preventDefault();

    if (!categoryID) {
      alert("Please select a category first");
      return;
    }
    categoriesExitAnimation(() => {
      try {
        updateCategory(selectedCategory, categoryID);
      } catch (error) {
        console.error("Failed to updated category", error);
        alert("Error");
        return;
      }
      window.location.href = "/quiz.html";
    });
  });

  // Helper function to render categories
  function renderCategories() {
    let apiCategories = apiData.categories;
    let html = apiCategories
      .map(
        (category, index) => `
  <li id="category-${index}" data-category="${index}"
      class="category-item dark:text-[#180f02] group relative w-full text-left p-1 text-sm lg:text-base xl:text-lg lg:p-4 rounded-lg overflow-hidden
             bg-white border-2 transition-all duration-300 cursor-pointer
             hover:translate-x-1 hover:shadow-lg"
      style="border-color: var(--main-primary-5)">
    
    <div class="absolute top-0 left-0 w-1 h-full transition-transform duration-300 
                scale-y-0 group-hover:scale-y-100"
         style="background-color: var(--main-primary)"></div>
    
    <a href="#"
       class="relative z-10 flex items-center justify-between 
              w-full no-underline">
      
      <div class="flex items-center">
        <span id="category-selected"  class="">
          ${categoryEmojis[index]} ${category.name}
        </span>
      </div>
      
      <i class="uil uil-check-circle text-lg lg:text-2xl opacity-0 scale-0 
                transition-all duration-300"
         style="color: var(--main-secondary)"></i>
    </a>
  </li>
`
      )
      .join("");
    ui.categoriesList.innerHTML = html;
  }
}
// QUIZ.HTML FUNCTIONS
function initQuizPage() {
  const user = getUser();
  const selectedCategory = user.categories.selectedCategory;
  const selectedCategoryID = user.categories.selectedCategoryID;

  // Display selected category in intro
  if (ui.quizNoticeCategory) {
    ui.quizNoticeCategory.textContent = `"${selectedCategory}"`;
  }

  let currentQuestionIndex = 0;
  let quizQuestions = [];
  let quizAnswers = [];
  let userAnswers = [];
  let quizScore = 0;
  let timer = 120; // 2 minutes
  let timerInterval;
  let currentProgress = 0;

  // Quiz Timer
  function quizTime() {
    const quizTimer = ui.quizTimer;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;

      quizTimer.textContent = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;

      if (timer <= 20) {
        quizTimer.classList.add("scale-pulse", "text-red-500");
        timerWarningAnimation();
      }

      if (timer === 0) {
        clearInterval(timerInterval);
        stopTimerAnimation();
        alert("Time's up! Your quiz will be submitted.");
        submitQuiz();
      }
      timer--;
    }, 1000);
  }

  // Display Question
  function displayQuestion(index) {
    const question = quizQuestions[index];
    ui.quizQuestion.textContent = `(${index + 1}) ${question.question}`;
    ui.quizChoiceList.innerHTML = question.options
      .map((choice, i) => {
        const selected = userAnswers[index] === choice;
        return `
          <li class="quiz-choice-item border-2 text-base lg:text-xl rounded-lg p-3 mb-3 cursor-pointer ${
            selected ? "selected" : ""
          }"
              data-choice="${i}"
              style="${
                selected ? "background:var(--main-secondary);color:#fff;" : ""
              }">
            ${choice}
          </li>
        `;
      })
      .join("");

    // Add event listeners to choices
    document.querySelectorAll(".quiz-choice-item").forEach((item) => {
      item.addEventListener("click", () => {
        document.querySelectorAll(".quiz-choice-item").forEach((c) => {
          c.classList.remove("selected");
          c.style.background = "";
          c.style.color = "";
        });
        item.classList.add("selected");
        item.style.background = "var(--main-secondary)";
        item.style.color = "#fff";
        const idx = Number(item.dataset.choice);
        userAnswers[currentQuestionIndex] = question.options[idx];
      });

      item.addEventListener("mouseenter", () =>
        choiceHoverAnimation(item, true)
      );
      item.addEventListener("mouseleave", () =>
        choiceHoverAnimation(item, false)
      );
    });

    // Update Next / Submit button
    const btn = ui.quizQuestionBtn;
    if (index === quizQuestions.length - 1) {
      btn.id = "submit-quiz";
      btn.innerHTML = `Submit Quiz <i class="uil uil-check-circle"></i>`;
      btn.classList.add("bg-[#30e0ff]");
    } else {
      btn.id = "next-choice";
      btn.innerHTML = `Next <i class="uil uil-arrow-right"></i>`;
    }
  }

  // Quiz Progress
  function quizProgress() {
    const answeredCount = userAnswers.filter((ans) => ans !== null).length;
    const progress = Math.round((answeredCount / quizQuestions.length) * 100);
    ui.quizProgress.textContent = `${progress}%`;
    ui.quizProgress.style.width = `${progress}%`;
    ui.quizProgress.classList.remove("opacity-0");

    if (progress === 0) {
      ui.quizProgress.classList.add("hidden");
    } else {
      ui.quizProgress.classList.remove("hidden");
    }
    currentProgress = progress;
    progressUpdateAnimation();
  }

  // Initialize Quiz
  function initiateQuiz() {
    quizIntroExitAnimation();
    window.addEventListener("beforeunload", (e) => {
      // Only warn if quiz is active
      if (!ui.quizCard.classList.contains("hidden")) {
        e.preventDefault();
      }
    });

    ui.quizIntro.classList.add("hidden");
    ui.quizCard.classList.remove("hidden");
    quizQuestions = apiData.categories[selectedCategoryID].questions;
    quizAnswers = quizQuestions.map((q) => q.correctAnswer);
    userAnswers = new Array(quizQuestions.length).fill(null);

    currentQuestionIndex = 0;
    currentProgress = 0;

    displayQuestion(0);
    quizTime();
    quizCardEnterAnimation();
  }

  // Display Results
  function displayResults() {
    clearInterval(timerInterval);
    // Calculate score
    quizScore = quizAnswers.reduce(
      (score, ans, i) => score + (userAnswers[i] === ans ? 1 : 0),
      0
    );
    updateQuizScores(quizScore);

    ui.quizCard.classList.add("hidden");
    ui.quizResults.classList.remove("hidden");

    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    let resultMessage = "";
    let resultEmoji = "";

    if (ui.progressCompleted && currentProgress >= 0) {
      ui.progressCompleted.textContent = `Completed: ${currentProgress}%`;
    }
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

    if (ui.quizResultScore)
      ui.quizResultScore.textContent = `${quizScore}/${quizQuestions.length}`;
    if (ui.quizHighestScore)
      ui.quizHighestScore.textContent = `${getUser().highestScore || 0}/${
        quizQuestions.length
      }`;
    if (ui.quizResultPercentage)
      percentageRevealAnimation(ui.quizResultPercentage, percentage);
    if (ui.quizResultMessage) ui.quizResultMessage.textContent = resultMessage;
    if (ui.quizResultEmoji) ui.quizResultEmoji.textContent = resultEmoji;
    if (ui.quizResultCategory)
      ui.quizResultCategory.textContent = selectedCategory;

    quizResultsEnterAnimation();
    ui.quizResults.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Display Answer Breakdown
  function displayAnswerBreakdown() {
    const answersSection = ui.quizAnswersSection;
    const spanCategory = ui.answerCategory;
    if (spanCategory) {
      spanCategory.textContent = selectedCategory;
    }
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
          <div class="p-4 w-auto answer-item border-2 rounded-lg ${borderColor} ${bgColor} text-[#000] transition-all hover:shadow-md">
            <div class="flex items-start justify-between">
              <h4 class="font-bold flex-1">Question ${
                index + 1
              }</h4>
              <span class="${statusClass} scale-125 font-bold">${statusIcon}</span>
            </div>
            <p class="my-2 font-medium">${
              question.question
            }</p>
            <div class="space-y-3 pl-4 border-l-4 mt-4 ${
              isCorrect ? "border-green-500" : "border-red-500"
            }">
              <p class="text-base">
                <span class="font-semibold">Your Answer:</span>
                <span class="${
                  isCorrect
                    ? "text-green-700 font-semibold"
                    : "text-red-700 font-semibold"
                }">
                  ${userAnswers[index] || "Not answered"}
                </span>
              </p>
              ${
                !isCorrect
                  ? `<p class="text-base"><span class="font-semibold">Correct Answer:</span> <span class="text-green-700 font-semibold">${quizAnswers[index]}</span></p>`
                  : ""
              }
              <p><span class="font-semibold text-slate-800">Explanation:</span> ${
                question.explanation
              }</p>
            </div>
          </div>
        `;
      })
      .join("");

    breakdownContainer.innerHTML = breakdownHTML;
    answerBreakdownEnterAnimation();
    // Animate each answer card
    document.querySelectorAll(".answer-item").forEach((item, idx) => {
      userAnswers[idx] === quizAnswers[idx]
        ? correctAnswerAnimation(item)
        : incorrectAnswerAnimation(item);
    });

    answersSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Submit Quiz
  function submitQuiz() {
    quizProgress();
    displayResults();
  }

  // Quiz Button Handler (Next / Submit)
  if (ui.quizQuestionBtn) {
    ui.quizQuestionBtn.addEventListener("click", () => {
      if (!userAnswers[currentQuestionIndex]) {
        alert("Please select an answer first.");
        return;
      }

      if (ui.quizQuestionBtn.id === "next-choice") {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
        quizProgress();
      } else {
        submitQuiz();
      }
    });
  }

  // Buttons
  if (ui.quizBtn) {
    if (timerInterval) clearInterval(timerInterval);
    ui.quizBtn.addEventListener("click", initiateQuiz);
  }

  quizResultsEnterAnimation();
  
  if (ui.homeBtn)
    ui.homeBtn.addEventListener(
      "click",
      () => (window.location.href = "/index.html")
    );
  
  if (ui.quizResultBtn)
    ui.quizResultBtn.addEventListener("click", displayAnswerBreakdown);

  // Retake Quiz
  if (ui.retakeQuizBtn) {
    ui.retakeQuizBtn.addEventListener("click", () => {
      ui.quizTimer.classList.remove("scale-pulse", "text-red-500");
      timer = 120;
      clearInterval(timerInterval);
      // Hide results & answer breakdown
      ui.quizResults.classList.add("hidden");
      ui.quizAnswersSection.classList.add("hidden");

      // Reset intro card visibility
      ui.quizIntro.classList.remove("hidden");
      ui.quizIntro.style.opacity = "1";
      ui.quizIntro.style.transform = "none";

      // Reset quiz state
      currentQuestionIndex = 0;
      quizScore = 0;
      quizAnswers = [];
      userAnswers = [];
      currentProgress = 0;

      ui.quizProgress.style.width = "0%";
      ui.quizProgress.textContent = "0%";
      ui.quizProgress.classList.add("opacity-0");

      // Start intro animation
      quizIntroAnimation();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}