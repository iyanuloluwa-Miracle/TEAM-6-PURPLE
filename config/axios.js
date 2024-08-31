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
let url = `https://tripadvisor16.p.rapidapi.com/api/v1`;

const get = async (params) => {
    try {
        const response = await axios.get(`${url}/${params}`, { headers })
        return response.data;
    } catch (e) {
        console.log(e, 'error returns:');
    }
}

module.exports = {
    get
}