// Fetch data from the API endpoint (categories, quizzes, etc.)
const fetchAPI = async () => {
    try {
        const res = await fetch(`/api/api.json`);
        if(!res.ok) throw new Error("Failed to fetch data...");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Error: ${error}`);
        return error;
    }
}
// Initialize API and handle response
const initAPI = async () => {
    let apiData = null;
    try {
        apiData = await fetchAPI();
        console.log("Data loaded:", apiData);
        return apiData;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}
export { fetchAPI, initAPI };