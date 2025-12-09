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
            categories: {},
            currentScore: 0,
            totalScore: 0,
            highestScore: 0
        }));
    }
}
const getLocalStorageItem = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const userTheme = localStorage.getItem('theme');
    return{ userInfo, userTheme };
}
export { initLocalStorage, getLocalStorageItem };