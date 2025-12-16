// Assign localStorage elements
const initLocalStorage = () => {
    if (!localStorage.getItem('theme')) {
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDark ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    }
    if (!localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify({
            name: '',
            categories: {
                selectedCategory: null,
                selectedCategoryID: null,
            },
            currentScore: 0,
            totalScore: 20,
            highestScore: 0,
        }));
    }
}
const getLocalStorageItem = (key) => {
    if(key === "user") return getUser();
    const userInfo = getUser();
    const userTheme = localStorage.getItem('theme');
    return{ userInfo, userTheme };
}
const getUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
    }
}
const updateUserName = (username) => {
    const user = getUser() || {
            name: '',
            categories: {
                selectedCategory: null,
                selectedCategoryID: null,
            },
            currentScore: 0,
            totalScore: 0,
            highestScore: 0,
        };
    user.name = username;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}
const updateCategory = (category, categoryID) => {
    const user = getUser();
    if(!user) return null;
    user.categories.selectedCategory = category;
    user.categories.selectedCategoryID = categoryID;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}
const updateQuizScores = (currentScore) => {
    const user = getUser();
    if(!user) return null;
    user.currentScore = currentScore;
    if(currentScore >= user.highestScore) user.highestScore = currentScore;
    localStorage.setItem('user', JSON.stringify(user));
}
const getTheme = () => {
    try {
        const theme = localStorage.getItem('theme');
        return theme ? theme : null;
    } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
    }
}
const updateTheme = (newTheme) => {
    let theme = getTheme();
    if(!theme) return null;
    theme = newTheme;
    localStorage.setItem('theme', theme);
}
const resetStorage = () => {
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDark ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        // Reset User
        localStorage.setItem('user', JSON.stringify({
            name: '',
            categories: {
                selectedCategory: null,
                selectedCategoryID: null,
            },
            currentScore: 0,
            totalScore: 20,
            highestScore: 0,
        }));
    }
export { initLocalStorage, getLocalStorageItem, getUser, updateUserName, updateCategory, updateQuizScores, getTheme, updateTheme, resetStorage };