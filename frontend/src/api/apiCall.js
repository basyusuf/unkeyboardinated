import axios from 'axios';

export const signup = (requestBody) => {
    let requestConfig = {
        url: '/api/1.0/users',
        data: requestBody,
        method: 'POST'
    }
    console.info("Request Config:", requestConfig);
    return axios(requestConfig);
}