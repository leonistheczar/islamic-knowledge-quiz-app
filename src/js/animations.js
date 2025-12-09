// animations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// UI Import as variables
import UI from "./ui.js";
const ui = UI().UISelectors();

gsap.registerPlugin(ScrollTrigger);

export function pageLoadAnimation() {
  const tl = gsap.timeline({ 
    defaults: { duration: 0.05, ease: "power2.out" },
    onComplete: () => gsap.set("#main-input input, #main-input button", { clearProps: "all" })
  });

tl.from("#header-container, #nav-links li", { opacity: 0, y: -10, stagger: 0.2 })
  .from("#main-content h1, #main-content p, #main-input input, #main-input button", { 
    opacity: 0, 
    y: 20,
    stagger: 0.15 
  });
}
// User Guide Dialog Animation

// GSAP Open Dialog Animation
export function dialogOpenAnimation() {
  const overlay = ui.dialogOverlay;
  const dialog = ui.dialogBox;
  const closeBtn = ui.closeDialogBtn;
  if (!overlay || !dialog || !closeBtn) return;

  gsap.set(overlay, { opacity: 0 });
  gsap.set(dialog, { opacity: 0, scale: 0.8, y: -30 });

  const openTL = gsap.timeline();

  openTL.to(overlay, {
    opacity: 1,
    duration: 0.3,
    ease: "power1.out",
  });

  openTL.to(
    dialog,
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.45,
      ease: "back.out(1.6)",
    },
    "-=0.15"
  );
}
// GSAP Close Dialog Animation
export function dialogCloseAnimation() {
  const overlay = ui.dialogOverlay;
  const dialog = ui.dialogBox;
  const closeBtn = ui.closeDialogBtn;

  if (!overlay || !dialog || !closeBtn) return;
    // Timeline for smooth controlled animation
    const tl = gsap.timeline({
      onComplete: () => {
        overlay.style.display = "none"; // optional: removes after animation
      },
    });

    tl.to(dialog, {
      opacity: 0,
      scale: 0.8,
      y: -40,
      duration: 0.3,
      ease: "power2.inOut",
    });

    tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
      },
      "-=0.15"
    );
    // Reuse page load animation
    pageLoadAnimation();
}

// Page Exit
export function pageExitAnimation(callback) {
  gsap.to("#main-content", {
    opacity: 0,
    y: -20,
    duration: 0.2,
    ease: "power1.inOut",
    onComplete: callback,
  });
}