import axios from 'axios';

const {
    REACT_APP_COMMON_DATA_SERVICE_PORT,
    REACT_APP_AUTHENTICATION_SERVICE_PORT,
    REACT_APP_SEARCH_SUGGESTION_SERVICE_PORT,
    REACT_APP_INSTANCE_IP
} = process.env

// export const getBaseURL = () => {
//     const { hostname, protocol } = window.location;
//     const url = `${protocol}//${hostname}`;
//     console.log("giving url new test : " + url);
//     return url;
// }  

export const authServiceAPI = axios.create({
    baseURL: `http://${REACT_APP_INSTANCE_IP}:${REACT_APP_AUTHENTICATION_SERVICE_PORT}`
})

export const commonServiceAPI = axios.create({
    baseURL: `http://${REACT_APP_INSTANCE_IP}:${REACT_APP_COMMON_DATA_SERVICE_PORT}`
})

export const searchSuggestionServiceAPI = axios.create({
    baseURL: `http://${REACT_APP_INSTANCE_IP}:${REACT_APP_SEARCH_SUGGESTION_SERVICE_PORT}`
})