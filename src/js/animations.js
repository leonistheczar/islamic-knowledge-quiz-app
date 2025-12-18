import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UI from "./ui.js";

const ui = UI().UISelectors();
gsap.registerPlugin(ScrollTrigger);

function exists(selector) {
  return document.querySelector(selector);
}

// ============================================
// MAIN PAGE ANIMATIONS
// ============================================

export function pageLoadAnimation() {
  const tl = gsap.timeline({ 
    defaults: { duration: 0.15, ease: "power2.out" },
    onComplete: () => gsap.set("#main-input input, #main-input button", { clearProps: "all" })
  });

  tl.from("#header-container, #nav-links li", { 
      opacity: 0, 
      y: -10, 
      stagger: 0.2 
    })
    .from("#main-content h1, #main-content p", { 
      opacity: 0, 
      y: 20,
      stagger: 0.15 
    })
    .from("#main-input, #main-input button", { 
      opacity: 0, 
      x: 50, 
      stagger: 0.2 
    });
}

export function pageExitAnimation(callback) {
  gsap.to("#main-content", {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power1.inOut",
    onComplete: callback,
  });
}

// ============================================
// DIALOG ANIMATIONS
// ============================================

export function dialogOpenAnimation() {
  document.body.classList.add('overflow-hidden');
  const overlay = ui.dialogOverlay;
  const dialog = ui.dialogBox;
  
  if (!overlay || !dialog) return;

  gsap.set(overlay, { opacity: 0 });
  gsap.set(dialog, { opacity: 0, scale: 0.8, y: -30 });

  const openTL = gsap.timeline();

  openTL.to(overlay, {
      opacity: 1,
      duration: 0.3,
      ease: "power1.out",
    })
    .to(dialog, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.45,
      ease: "back.out(1.6)",
    }, "-=0.15");
}

export function dialogCloseAnimation() {
  document.body.classList.remove('overflow-hidden');
  const overlay = ui.dialogOverlay;
  const dialog = ui.dialogBox;

  if (!overlay || !dialog) return;

  const tl = gsap.timeline({
    onComplete: () => {
      overlay.style.display = "none";
    },
  });

  tl.to(dialog, {
      opacity: 0,
      scale: 0.8,
      y: -40,
      duration: 0.3,
      ease: "power2.inOut",
    })
    .to(overlay, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.inOut",
    }, "-=0.15");
}

// ============================================
// CATEGORIES SCREEN ANIMATIONS
// ============================================

export function categoriesLoad() {
  // 🔹 Ensure visibility BEFORE animation
  gsap.set("#categories-screen", {
    opacity: 1,
    y: 0,
    display: "block"
  });

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" }
  });

  tl.from("#categories-screen", {
      opacity: 0,
      y: -80,
      duration: 0.4,
      ease: "power1.inOut"
    })
    .from("#categories-content h2", {
      opacity: 0,
      y: 20,
      duration: 0.3
    }, "-=0.2")
    .from(".category-item", {
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.4,
      ease: "back.out(1.2)"
    }, "-=0.1");
}
export function categorySelectAnimation(element) {
  gsap.fromTo(element,
    { scale: 0.95 },
    { 
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    }
  );
}

export function categoryDeselectAnimation(element) {
  gsap.to(element, {
    scale: 1,
    duration: 0.2,
    ease: "power1.out"
  });
}

export function categoriesExitAnimation(callback) {
  const tl = gsap.timeline({
    onComplete: callback
  });

  tl.to(".category-item", {
      opacity: 0,
      x: 30,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.in"
    })
    .to("#categories-content h2, #user-name", {
      opacity: 0,
      y: -20,
      duration: 0.25
    }, "-=0.2");
}

// ============================================
// QUIZ INTRO ANIMATIONS
// ============================================

export function quizIntroAnimation() {
  const tl = gsap.timeline({ 
    defaults: { ease: "power2.out" }
  });

  if(!exists("#quiz-intro")) return;  
  tl.from("#quiz-intro", {
    opacity: 0,
    scale: 0.95,
    duration: 0.4
  })
  .from("#quiz-intro h2, #quiz-intro p", {
    opacity: 0,
    y: 20,
    stagger: 0.15,
    duration: 0.3
  }, "-=0.2")
}

export function quizIntroExitAnimation(callback) {
  if(!exists("#quiz-intro")) return;  
  gsap.to("#quiz-intro", {
    opacity: 0,
    scale: 0.95,
    y: -20,
    duration: 0.4,
    ease: "power2.in",
    onComplete: callback
  });
}

// ============================================
// QUIZ CARD ANIMATIONS
// ============================================

export function quizCardEnterAnimation() {
  const tl = gsap.timeline({ 
    defaults: { ease: "power2.out" }
  });
  if(!exists("#quiz-card")) return;
  if(!exists("#quiz-category")) return;
  if(!exists("#quiz-timer")) return;
  if(!exists("#quiz-progress")) return;
  tl.from("#quiz-card", {
      opacity: 0,
      y: 30,
      duration: 0.25
    })
    .from("#quiz-category, #quiz-timer", {
      opacity: 0,
      stagger: 0.1,
      duration: 0.3
    }, "-=0.3")
    .from("#quiz-progress", {
      scaleX: 0,
      transformOrigin: "left",
      duration: 0.25,
      ease: "power2.out"
    }, "-=0.2");
}

export function questionTransitionAnimation(callback) {
  const tl = gsap.timeline({
    onComplete: callback
  });
if(!exists("#quiz-question")) return;
if(!exists("#quiz-choices")) return;
  tl.to("#quiz-question, #quiz-choices", {
      opacity: 0,
      x: -20,
      duration: 0.08,
      ease: "power2.in"
    })
    .set("#quiz-question, #quiz-choices", { x: 20 })
    .to("#quiz-question, #quiz-choices", {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "power2.out"
    });
}

export function choiceHoverAnimation(element, isHover) {
  gsap.to(element, {
    x: isHover ? 5 : 0,
    duration: 0.2,
    ease: "power1.out"
  });
}

export function progressUpdateAnimation() {
  if(!exists("#quiz-progress")) return;
  gsap.to("#quiz-progress", {
    scaleX: 1.02,
    duration: 0.2,
    ease: "power1.inOut",
    yoyo: true,
    repeat: 1
  });
}

export function timerWarningAnimation() {
  if(!exists("#quiz-timer")) return;
  gsap.killTweensOf("#quiz-timer");
  gsap.to("#quiz-timer", {
    scale: 1.1,
    duration: 0.3,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1
  });
}

export function stopTimerAnimation() {
  if(!exists("#quiz-timer")) return;
  gsap.killTweensOf("#quiz-timer");
  gsap.set("#quiz-timer", { scale: 1 });
}

// ============================================
// QUIZ RESULTS ANIMATIONS
// ============================================

export function quizResultsEnterAnimation() {
  const tl = gsap.timeline({ 
    defaults: { ease: "power2.out" }
  });
  
  if(!exists("#quiz-results")) return;
  if(!exists("#quiz-result-emoji")) return;
  if(!exists("#quiz-result-message")) return;
  if(!exists("#quiz-result-score")) return;
  if(!exists("#quiz-highest-score")) return;
  if(!exists("#quiz-result-percentage")) return;
  if(!exists("#quiz-result-btn")) return;
  if(!exists("#retake-btn")) return;
  if(!exists("#home-btn")) return;
  tl.from("#quiz-results", {
    opacity: 0,
    scale: 0.9,
    duration: 0.5
  })
  .from("#quiz-result-emoji", {
    scale: 0,
    rotation: 180,
    duration: 0.6,
    ease: "back.out(2)"
  }, "-=0.3")
  .from("#quiz-result-message", {
    opacity: 0,
    y: 20,
    duration: 0.4
  }, "-=0.3")
  .from("#quiz-result-score, #quiz-highest-score", {
    opacity: 0,
    scale: 0.8,
    stagger: 0.15,
    duration: 0.4,
    ease: "back.out(1.7)"
  }, "-=0.2")
  .from("#quiz-result-percentage", {
    duration: 1,
    ease: "power1.out"
  }, "-=0.4")
    .from("#quiz-result-btn, #retake-quiz-btn, #home-btn", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.3
    }, "-=0.5");
  }
  
  export function scoreCountUpAnimation(element, finalScore) {
    gsap.to(element, {
      innerText: finalScore,
      duration: 1.5,
      snap: { innerText: 1 },
    ease: "power2.out"
  });
}

export function percentageRevealAnimation(element, percentage) {
  const obj = { value: 0 };
  
  gsap.to(obj, {
    value: percentage,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(obj.value) + "%";
    }
  });
}

// ============================================
// ANSWER BREAKDOWN ANIMATIONS
// ============================================

export function answerBreakdownEnterAnimation() {
  const tl = gsap.timeline({ 
    defaults: { ease: "power2.out" }
  });
  
  if(!exists("#quiz-answers")) return;
  if(!exists("#answer-category")) return;
  if(!exists("#quiz-answer-breakdown > div")) return;
  tl.from("#quiz-answers", {
    opacity: 1,
    y: 30,
    duration: 0.5
  })
    .from("#answer-category", {
      opacity: 1,
      y: 20,
      duration: 0.3
    }, "-=0.3")
    .from("#quiz-answer-breakdown > div", {
      opacity: 1,
      y: 30,
      stagger: 0.1,
      duration: 0.4,
      ease: "back.out(1.2)"
    }, "-=0.2");
  }
  
  export function correctAnswerAnimation(element) {
    gsap.from(element, {
      backgroundColor: "#86efac",
      duration: 0.6,
      ease: "power2.out"
    });
  }
  
  export function incorrectAnswerAnimation(element) {
    gsap.from(element, {
      backgroundColor: "#fca5a5",
      duration: 0.6,
      ease: "power2.out"
    });
  }
  
  // ============================================
  // BUTTON ANIMATIONS
  // ============================================
  
  export function buttonClickAnimation(element) {
    gsap.fromTo(element,
      { scale: 0.95 },
      { 
        scale: 1,
        duration: 0.2,
        ease: "back.out(3)"
      }
    );
  }
  
export function buttonHoverAnimation(element, isHover) {
  gsap.to(element, {
    scale: isHover ? 1.05 : 1,
    duration: 0.3,
    ease: "power1.out"
  });
}

export function buttonPulseAnimation(element) {
  gsap.to(element, {
    scale: 1.05,
    duration: 0.5,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1
  });
}

export function stopButtonPulseAnimation(element) {
  gsap.killTweensOf(element);
  gsap.to(element, {
    scale: 1,
    duration: 0.2
  });
}

// ============================================
// LOADING & TRANSITION ANIMATIONS
// ============================================

export function loadingAnimation(element) {
  gsap.to(element, {
    rotation: 360,
    duration: 1,
    ease: "none",
    repeat: -1
  });
}
export function slideInFromRight(element, duration = 0.5) {
  gsap.from(element, {
    x: 100,
    opacity: 1,
    duration: duration,
    ease: "power2.out"
  });
}

export function slideInFromLeft(element, duration = 0.5) {
  gsap.from(element, {
    x: -100,
    opacity: 1,
    duration: duration,
    ease: "power2.out"
  });
}

export function slideOutToRight(element, duration = 0.5, callback) {
  gsap.to(element, {
    x: 100,
    opacity: 1,
    duration: duration,
    ease: "power2.in",
    onComplete: callback
  });
}

export function slideOutToLeft(element, duration = 0.5, callback) {
  gsap.to(element, {
    x: -100,
    opacity: 1,
    duration: duration,
    ease: "power2.in",
    onComplete: callback
  });
}
// ============================================
// THEME TRANSITION ANIMATIONS
// ============================================

export function themeTransitionAnimation() {
  const tl = gsap.timeline();
  if(!exists("#body")) return;
  tl.to("#body", {
    opacity: 0.9,
      duration: 0.2,
      ease: "power1.inOut"
    })
    .to("#body", {
      opacity: 1,
      duration: 0.2,
      ease: "power1.inOut"
    });
}
