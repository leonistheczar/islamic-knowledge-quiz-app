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
    return JSON.parse(localStorage.getItem('user'));
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
export { initLocalStorage, getLocalStorageItem, getUser, updateUserName, updateCategory, updateQuizScores };