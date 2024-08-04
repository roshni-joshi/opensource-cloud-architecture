import axios from 'axios';

const {
    REACT_APP_COMMON_DATA_SERVICE_PORT,
    REACT_APP_AUTHENTICATION_SERVICE_PORT,
    REACT_APP_SEARCH_SUGGESTION_SERVICE_PORT
} = process.env

// export const getBaseURL = () => {
//     const { hostname, protocol } = window.location;
//     const url = `${protocol}//${hostname}`;
//     console.log("giving url new test : " + url);
//     return url;
// }  

export const authServiceAPI = axios.create({
    baseURL: `http://csci5411-lb-999554601.us-east-1.elb.amazonaws.com:${REACT_APP_AUTHENTICATION_SERVICE_PORT}`
})

export const commonServiceAPI = axios.create({
    baseURL: `http://csci5411-lb-999554601.us-east-1.elb.amazonaws.com:${REACT_APP_COMMON_DATA_SERVICE_PORT}`
})

export const searchSuggestionServiceAPI = axios.create({
    baseURL: `http://csci5411-lb-999554601.us-east-1.elb.amazonaws.com:${REACT_APP_SEARCH_SUGGESTION_SERVICE_PORT}`
})