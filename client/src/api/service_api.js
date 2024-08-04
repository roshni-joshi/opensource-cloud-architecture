import axios from 'axios';

const {
    REACT_APP_COMMON_DATA_SERVICE_PORT,
    REACT_APP_AUTHENTICATION_SERVICE_PORT,
    REACT_APP_SEARCH_SUGGESTION_SERVICE_PORT
} = process.env

export const getBaseURL = async () => {
    //const { hostname, protocol } = window.location;
    const response = await axios.get('http://169.254.169.254/latest/meta-data/local-ipv4');
    console(response)
    const url = "http://" + response.data;
    console.log("giving url : " + url);
    return url;
}  

export const authServiceAPI = axios.create({
    baseURL: getBaseURL() + `:${REACT_APP_AUTHENTICATION_SERVICE_PORT}`
})

export const commonServiceAPI = axios.create({
    baseURL: getBaseURL() + `:${REACT_APP_COMMON_DATA_SERVICE_PORT}`
})

export const searchSuggestionServiceAPI = axios.create({
    baseURL: getBaseURL() + `:${REACT_APP_SEARCH_SUGGESTION_SERVICE_PORT}`
})