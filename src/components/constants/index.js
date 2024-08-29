// BaseURL
export const baseURL = process.env.REACT_APP_API_ENDPOINT;

// EndPoints
const endPoints = {
    // Email Analyzer
    getEmails: `${baseURL}fetch_emails`,

    analyzeEmail: `${baseURL}analyze_email`,
}


export default endPoints;