// animations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function pageLoadAnimation() {
  const tl = gsap.timeline({ 
    defaults: { duration: 0.15, ease: "power2.out" },
    onComplete: () => gsap.set("#main-input input, #main-input button", { clearProps: "all" })
  });

  tl.from("#header-container", { y: -100, opacity: 0 })
    .from("#nav-links li", { opacity: 0, y: -20, stagger: 0.2 })
    .from("#main-content h1", { opacity: 0, y: 50 })
    .from("#main-content p", { opacity: 0, y: 30, delay: 0.2 })
    .from("#main-input input", { opacity: 0, x: -50 })
    .from("#main-input button", { opacity: 0, x: 50, delay: 0.1 });
}
