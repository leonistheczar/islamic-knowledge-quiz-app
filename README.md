<div align="center">

# ImanQuiz - Islamic Knowledge Quiz App

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

**An Interactive Islamic Knowledge Quiz Platform**

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Now-success?style=for-the-badge)](https://iman-quiz.vercel.app/)

</div>

## 📚 Academic Information

**Course:** Web Technologies         
**Instructor:** Sir Zahid Aziz                  
**Institution:** Emerson University Multan                 
**Semester:** 5th Semester, Morning - Fall 2023                      
**Program:** Bachelor of Computer Science                
**Batch:** 2023-2027          

### Team Members

| Name          | GitHub Profile                                     | Role                               |
| ------------- | -------------------------------------------------- | ---------------------------------- |
| Muhammad Ali  | [@leonistheczar](https://github.com/leonistheczar) | Team Lead, Fullstack Developer     |
| Ayesha Saleem | [@aysh34](https://github.com/aysh34)               | UI/UX Designer, Frontend Developer |
| Subhan Gill   | [@Subhangill](https://github.com/Subhangill)       | Frontend Developer                 |

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Project Objectives](#project-objectives)
- [Course Requirements](#course-requirements)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Features Implementation](#features-implementation)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## Project Overview

ImanQuiz is an interactive web-based quiz application designed to help users test and enhance their knowledge of Islam. The application covers multiple categories including Quran, Hadith, Fiqh (Islamic Jurisprudence), and Seerah (Prophet's Biography). This project was developed as part of the Web Technologies course curriculum at Emerson University Multan.

### Problem Statement

Traditional methods of Islamic education often lack interactivity and immediate feedback. Students and learners need a modern, accessible platform where they can:

- Test their Islamic knowledge anytime, anywhere
- Track their progress and identify areas for improvement
- Learn through an engaging, user-friendly interface
- Access authentic Islamic content with proper references

### Solution

ImanQuiz addresses these challenges by providing:

- An intuitive quiz interface with multiple categories
- Real-time score calculation and feedback
- Progress tracking using browser localStorage
- Responsive design that works on all devices
- Authentic Islamic content with verified references

## Project Objectives

This project was developed to fulfill the following academic objectives:

### Primary Objectives

1. **Apply Web Development Fundamentals**: Demonstrate proficiency in HTML5, CSS3, and JavaScript
2. **Implement Responsive Design**: Create a mobile-first, responsive user interface
3. **Utilize Modern CSS Framework**: Integrate Tailwind CSS for efficient styling
4. **Data Persistence**: Implement localStorage for saving user progress
5. **DOM Manipulation**: Use JavaScript for dynamic content rendering and user interaction
6. **Version Control**: Collaborate using Git and GitHub

### Secondary Objectives

1. Create an engaging user experience with smooth animations
2. Implement proper code organization and modularity
3. Follow web development best practices
4. Deploy the application to a live hosting platform
5. Document the project comprehensively

## Course Requirements

This project successfully implements all the required course specifications:

### Technical Requirements Met

**HTML5**

- Semantic HTML elements (`<header>`, `<main>`, `<section>`, `<footer>`)
- Multiple interconnected pages (index, quiz, about, contact)
- Proper document structure and accessibility
- Form elements for user interaction

**CSS3**

- Tailwind CSS framework integration
- Custom CSS for specific styling needs
- Responsive design with media queries
- Flexbox and Grid layouts
- CSS animations and transitions
- Mobile-first approach

**JavaScript**

- DOM manipulation and event handling
- localStorage for data persistence
- JSON data handling
- Modular code organization
- ES6+ features (arrow functions, template literals, destructuring)
- Dynamic content rendering

**Additional Requirements**

- Responsive design (works on mobile, tablet, desktop)
- localStorage implementation for score tracking
- Clean, maintainable code structure
- Git version control
- Live deployment on Vercel

## Key Features

### For Users

**User Registration System**
Users enter their name at the start, which is saved for a personalized experience throughout the quiz session.

**Six Quiz Categories**
Choose from six comprehensive Islamic knowledge categories:

1. 🕋 Pillars of Islam - Test your understanding of the five pillars
2. 🕊️ Prophets in Islam - Learn about the prophets mentioned in the Quran
3. 📖 Quran Knowledge - Challenge yourself with Quranic facts and history
4. 💠 Islamic Beliefs (Aqidah) - Explore the fundamentals of Islamic faith
5. 📜 Islamic History - Journey through significant Islamic events and figures
6. 🌿 Islamic Ethics - Understand Islamic moral principles and conduct

**Timed Quiz Experience**
Each quiz has a 2-minute timer, adding an element of challenge and focus to the learning experience.

**Score Tracking**
Each correct answer earns 1 point. Users can take quizzes in all categories, and their cumulative score is tracked across all attempts.

**Detailed Results**
After completing the quiz, users see their final score with a breakdown of their performance across all categories attempted.

**Progress Persistence**
User names and scores are saved in localStorage, allowing users to continue their learning journey across sessions.

### Technical Features

- User name registration and persistence
- 2-minute countdown timer per quiz
- Six focused quiz categories
- Real-time score calculation (1 point per correct answer)
- Cumulative scoring across all categories
- localStorage for user data and scores
- Single Page Application experience
- Fast loading times with optimized assets
- Smooth page transitions and animations
- Cross-browser compatibility
- Clean and maintainable code architecture
- JSON-based data structure for easy content management

## Technologies Used

### Core Technologies

**Frontend**

- **HTML5**: Semantic markup and structure
- **CSS3**: Styling and animations
- **JavaScript (ES6+)**: Interactive functionality and logic
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

**Build Tools**

- **Vite**: Fast build tool and development server
- **npm**: Package management

**Version Control**

- **Git**: Source code management
- **GitHub**: Repository hosting and collaboration

**Deployment**

- **Vercel**: Cloud hosting platform

**Development Tools**

- **VS Code**: Code editor
- **Chrome DevTools**: Debugging and testing
- **Git Bash**: Command line interface

## Installation & Setup

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (version 16.0.0 or higher)
- npm (version 7.0.0 or higher)
- Git (version 2.30.0 or higher)
- A modern web browser

Verify installations:

```bash
node --version
npm --version
git --version
```

### Step-by-Step Installation

1. **Clone the Repository**

```bash
git clone https://github.com/leonistheczar/islamic-knowledge-quiz-app.git
cd islamic-knowledge-quiz-app
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start Development Server**

```bash
npm run dev
```

The application will automatically open in your browser at `http://localhost:5173/`

4. **Build for Production**

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

### Troubleshooting

**Port Already in Use**

```bash
npm run dev -- --port 3000
```

**Dependency Issues**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Build Errors**

```bash
npm cache clean --force
npm install
npm run build
```

## Project Structure

```
islamic-knowledge-quiz-app/
├── public/                       # Static assets
│   ├── api/
│   │   └── api.json             # Quiz questions database
│   ├── images/                  # Images and icons
│   │   ├── logo.svg
│   │   ├── hero-bg.jpg
│   │   └── categories/
│   └── manifest.json            # PWA manifest
├── src/                         # Source files
│   ├── css/
│   │   ├── main.css            # Main Tailwind styles
│   │   └── pages/              # Page-specific styles
│   │       ├── quiz.css
│   │       ├── results.css
│   │       └── about.css
│   └── js/
│       ├── app.js              # Main application logic
│       ├── quiz.js             # Quiz functionality
│       ├── storage.js          # localStorage operations
│       ├── api.js              # Data fetching
│       └── utils.js            # Utility functions
├── index.html                   # Homepage
├── quiz.html                    # Quiz interface
├── about.html                   # About page
├── contact.html                 # Contact page
├── package.json                 # Project dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── .gitignore                  # Git ignore rules
└── README.md                    # Project documentation
```

### Key Directories Explained

**public/** - Contains static assets that are served directly without processing. The `api/api.json` file stores all quiz questions in a structured JSON format.

**src/css/** - Contains all stylesheets. `main.css` includes Tailwind directives and global styles, while the `pages/` folder contains page-specific styling.

**src/js/** - Houses all JavaScript modules. Code is organized by functionality for better maintainability and collaboration.

## Development Workflow

Our team followed a structured Git workflow to ensure smooth collaboration:

### Branch Strategy

**main** - Stable production-ready code
**feature/** - New features (e.g., `feature/quiz-timer`)
**fix/** - Bug fixes (e.g., `fix/score-calculation`)

### Daily Workflow

1. **Pull Latest Changes**

```bash
git checkout main
git pull origin main
```

2. **Create Feature Branch**

```bash
git checkout -b feature/your-feature-name
```

3. **Make Changes and Commit**

```bash
git add .
git commit -m "Add: Feature description"
```

4. **Push to Remote**

```bash
git push origin feature/your-feature-name
```

5. **Create Pull Request**
   Open a PR on GitHub for team review

### Commit Message Convention

We followed a consistent commit message format:

- `Add:` New features or files
- `Fix:` Bug fixes
- `Update:` Modifications to existing features
- `Refactor:` Code improvements without functionality changes
- `Docs:` Documentation updates
- `Style:` UI/CSS changes

**Examples:**

```
Add: Quiz timer functionality with pause button
Fix: localStorage not persisting scores correctly
Update: Improved mobile responsive design for quiz page
Refactor: Modularized quiz logic into separate functions
```

## Features Implementation

### 1. Dynamic Quiz Loading

Questions are loaded dynamically from JSON:

```javascript
// src/js/api.js
export async function loadQuizData() {
  try {
    const response = await fetch("/api/api.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading quiz data:", error);
    return null;
  }
}
```

### 2. localStorage Implementation

User progress is saved using localStorage:

```javascript
// src/js/storage.js
export function saveScore(category, score) {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || {};
  scores[category] = score;
  localStorage.setItem("quizScores", JSON.stringify(scores));
}

export function getScore(category) {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || {};
  return scores[category] || 0;
}
```

### 3. Responsive Design

Tailwind CSS utilities for responsive layout:

```html
<!-- Mobile-first responsive design -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div
    class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
  >
    <!-- Category card -->
  </div>
</div>
```

### 4. Quiz Logic

Core quiz functionality:

```javascript
// src/js/quiz.js
export class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestion = 0;
    this.score = 0;
  }

  checkAnswer(selectedIndex) {
    const correct = this.questions[this.currentQuestion].correctAnswer;
    if (selectedIndex === correct) {
      this.score++;
      return true;
    }
    return false;
  }

  nextQuestion() {
    this.currentQuestion++;
    return this.currentQuestion < this.questions.length;
  }

  getResults() {
    return {
      score: this.score,
      total: this.questions.length,
      percentage: (this.score / this.questions.length) * 100,
    };
  }
}
```

## Future Enhancements

While our project meets all academic requirements, we've identified several potential improvements for future iterations:

### Short-term Enhancements

**Quiz Timer**
Add a countdown timer for each question with pause functionality to make quizzes more challenging.

**Difficulty Levels**
Allow users to select difficulty level (Easy, Medium, Hard) before starting a quiz.

**Leaderboard**
Implement a local leaderboard showing top scores for each category.

**Question Shuffle**
Randomize question order to prevent memorization and provide varied experiences.

### Long-term Features

**User Authentication**
Add user accounts to track progress across devices using a backend service.

**Multi-language Support**
Implement Arabic and Urdu interfaces to reach a wider audience.

**Audio Recitation**
Include audio recitation for Quranic verses in relevant questions.

**Social Sharing**
Allow users to share their scores on social media platforms.

**Mobile Application**
Convert to a Progressive Web App (PWA) with offline capabilities or develop native mobile apps.

**Backend Integration**
Implement a backend API for centralized question management and real-time updates.

## Contributing

While this is primarily an academic project, we welcome feedback and suggestions:

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit with clear messages (`git commit -m "Add: Improvement description"`)
5. Push to your branch (`git push origin feature/improvement`)
6. Open a Pull Request

### Contribution Guidelines

**Islamic Content**

- All Islamic content must be verified against authentic sources
- Include references from Quran, Sahih Hadith collections
- Maintain scholarly accuracy and neutrality

**Code Quality**

- Follow existing code style and structure
- Write clear, self-documenting code
- Add comments for complex logic
- Test thoroughly before submitting

**Documentation**

- Update README if adding new features
- Document new functions and modules
- Include usage examples where appropriate

## Acknowledgments

We would like to express our gratitude to:

**Sir Zahid Aziz**
Our Web Technologies instructor, for his guidance, support, and valuable feedback throughout this project. His expertise in web development helped us overcome many technical challenges.

**Emerson University Multan**
For providing the academic environment and resources necessary for learning and implementing modern web technologies.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Academic Use Notice

This project was developed as part of the Web Technologies course at Emerson University Multan. While the code is open source, we request that:

- Students using this as reference cite it appropriately
- Direct copying for academic submissions is discouraged
- Learning from the implementation and creating original work is encouraged

## Contact & Support

### Team Contact

**Muhammad Ali**                      
GitHub: [@leonistheczar](https://github.com/leonistheczar)                           
Email: ali.at.grind@gmail.com                    

**Ayesha Saleem**                                            
GitHub: [@aysh34](https://github.com/aysh34)                                     
Email: ayeshasaleem853@gmail.com                                 

**Subhan Gill**                                                               
GitHub: [@Subhangill](https://github.com/Subhangill)                                  
Email: subhan.gill@gmail.com                                                  

### Project Links

- **Live Demo:** [iman-quiz.vercel.app](https://iman-quiz.vercel.app/)
- **Repository:** [github.com/leonistheczar/islamic-knowledge-quiz-app](https://github.com/leonistheczar/islamic-knowledge-quiz-app)
- **Issues:** [Report bugs or request features](https://github.com/leonistheczar/islamic-knowledge-quiz-app/issues)

## 🤲 A Prayer for Beneficial Knowledge

<div align="center">

**بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ**

**رَبِّ زِدْنِي عِلْمًا**

_"My Lord, increase me in knowledge"_
Quran 20:114

May Allah accept this humble effort and make it a source of beneficial knowledge for all who use it. May He guide us in our studies and grant us success in this world and the Hereafter.

**اللَّهُمَّ آمِين**

</div>

**Developed with dedication by Muhammad Ali, Ayesha Saleem & Subhan Gill**
_Web Technologies Course Project - Emerson University Multan_

_"The best of you are those who learn the Quran and teach it."_ — Sahih Bukhari 5027

[⬆ Back to Top](#imanquiz---islamic-knowledge-quiz-app)
