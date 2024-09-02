const axios = require('axios');
const env = require('dotenv').config()

const headers = {
    'x-rapidapi-key': process.env.API_KEY,
    'x-rapidapi-host': process.env.API_HOST
}
const payload = {
    username: process.env.API_USER,
    password: process.env.API_PASSWORD
};
let baseUrl = `https://tripadvisor16.p.rapidapi.com/api/v1`;

const get = async (url) => {
    console.log(url, 'url says:');
    try {
        const response = await axios.get(`${baseUrl}/${url}`, { headers })
        return response;
    } catch (e) {
        console.log(e, 'error returns:');
    }
}

const getWithParams = async (url, params) => {
    console.log(url, 'url says:');
    try {
        const response = await axios.get(`${baseUrl}/${url}`, params, { headers })
        return response.data;
    } catch (e) {
        console.log(e, 'error returns:');
    }

}

module.exports = {
    get,
    getWithParams
}