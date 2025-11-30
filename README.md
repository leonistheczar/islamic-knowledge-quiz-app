# KnowDeen – Development Workflow & Repo Guide

This document outlines the development layout, branching workflow, and best practices for collaborative work on the KnowDeen project.

---

## Development Layout

- **HTML Pages:** Placed in the root (or optionally in a `pages/` folder). Each page links to shared CSS and page-specific JS. Example: `index.html`, `quiz.html`, `results.html`.  
- **CSS:** Shared styles in `src/css/main.css` (Tailwind + custom). Optional page-specific styles can go in `src/css/pages/quiz.css`.  
- **JavaScript:** Shared logic in `src/js/app.js`. Page-specific logic in `src/js/quiz.js` and `src/js/results.js`. Quiz data is stored in `src/js/data.js`. Optional helper modules can go in `src/js/utils.js`, and reusable components in `src/js/components/`.  
- **Static Assets:** Stored in `public/` (images, icons, JSON API: `public/api/questions.json`).  

---

## Git & Branching Workflow

1. **Initial Setup:** Work on `main` for initial project structure and push the initial commit.  
2. **Creating Personal Branch:**
```bash
git checkout -b your-branch-name
git push origin your-branch-name
```
3. **Daily Work:** Pull the latest `main` before starting new changes:
```bash
git checkout main
git pull origin main
git checkout your-branch-name
git merge main
```
Commit frequently with descriptive messages:
```bash
git add .
git commit -m "Add feature X / Fix bug Y"
git push origin your-branch-name
```
4. ***Merging:*** Create a Pull Request to merge into `main` after review. Keep `main` stable; no direct pushes.

## Team Collaboration Tips

- Each member works on their own branch.
- Keep commits small and descriptive.
- Use modular JS to prevent conflicts.
- Pull main frequently to stay synced with teammates.
- Use `localStorage` or shared modules for passing data between pages

## Building & Running Locally
```bash
npm install
npm run dev
```
- Dev server auto-opens in the browser (default: http://localhost:5173/)
- Build for production:
```bash
npm run build
```
- Output folder: build/
